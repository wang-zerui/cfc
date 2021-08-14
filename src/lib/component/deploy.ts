import { ICredentials } from '../interface/profile';
import Client from '../client';
import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as HELP from '../help/deploy';
import Function from './function';
import Trigger from './trigger';
let CONFIGS = require('../config');

const COMMAND: string[] = [
  'all',
  'function',
  'trigger',
  'help',
];

// interface EndProps {
//   region: string;
//   assumeYes?: boolean;
//   onlyLocal?: boolean;
//   serviceName?: string;
//   functionName?: string;
//   qualifier?: string;
//   layerName?: string;
//   version?: string;
//   aliasName?: string;
// }

export default class deploy {
  static async handleInputs(inputs){
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];

    const subCommand = rawData[0] || 'all';
    logger.debug(`deploy subCommand: ${subCommand}`);
    if (!COMMAND.includes(subCommand)) {
      core.help(HELP.DEPLOY);
      return { errorMessage: `Does not support ${subCommand} command` };
    }
    
    if (parsedData.help) {
      rawData[0] ? core.help(HELP[`deploy_${subCommand}`.toLocaleUpperCase()]) : core.help(HELP.DEPLOY);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps = props;

    if (!endProps.endpoint) {
      throw new Error('Not fount endpoint');
    }
    
    const credentials: ICredentials = inputs.credentials;
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
    const endpoint = protocol + '://' + postEndpoint;
    return {
      endpoint,
      credentials,
      subCommand,
      props: endProps,
      args: props.args,
      table: parsedData.table,
    };
  }
  constructor({endpoint, credentials}:{endpoint: string, credentials: ICredentials}){
    Client.setCfcClient(credentials, endpoint);
  }

  async deployFunction({props, credentials}){
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
    const endpoint = protocol + '://' + postEndpoint;
    const functionClient = new Function({endpoint, credentials});

    const functions = await functionClient.list();
    let isCreated = false;

    for (let i = 0; i < 3; i++) {
      if (functions[i].FunctionName === props.functionName) {
        isCreated = true;
        break;
      }
    }
    if(isCreated){
      await functionClient.updateConfig(props);
      return await functionClient.updateCode(props);
    }else{
      return await functionClient.create(props);
    }
    
  }

  async deployTrigger(functionBrn: string, props, credentials: ICredentials){
    const target = functionBrn;
    const data = props.trigger.data;
    const source = props.trigger.source;
    const relationId = props.trigger.RelationId;
    const IProps = {
      target,
      data,
      source,
      relationId
    }
    const triggerClient = new Trigger(credentials);
    const vm = core.spinner('Trigger deploying...')
    const {
      response,
      error
    } = await triggerClient.create(IProps);
    if(error){
      if(error.message.Code === 'ResourceConflictException'){
        if(relationId){
          const updateRes =  await triggerClient.update(IProps);
          if(updateRes.fail){
            vm.fail('Trigger deploy failed');
            logger.error(error.message.Message);
          }else{
            vm.succeed('Trigger deployed');
          }
        }else{
          vm.fail('Trigger deploy failed');
          throw new Error('Provide a relationId if you want to update the trigger. Or modefy the configuration of the trigger.')
        }
      }else{
        vm.fail('Trigger deploy failed');
        logger.error(error.message.Message);
        return error;
      }
    }else{
      vm.succeed('New trigger deployed');
      return response;
    }
  }

  async getBrn(props, credentials){
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
    const endpoint = protocol + '://' + postEndpoint;
    const functionClient = new Function({endpoint, credentials});
    return await functionClient.getBrnByFunctionName(props.functionName);
  }

  async deploy(props, subCommand, credentials, inputs){
    if(subCommand === 'all') {
      const deployFunctionRes =  await this.deployFunction({props, credentials});
      const functionBrn = await deployFunctionRes;
      await this.deployTrigger(functionBrn, props, credentials);
    }
    if(subCommand === 'function'){
      return await this.deployFunction({props, credentials});
    }
    if(subCommand === 'trigger'){
      const functionBrn = props.functionBrn || await this.getBrn(props, credentials);
      await this.deployTrigger(functionBrn, props, credentials);
    }
    if(subCommand === 'help'){
      core.help(HELP.DEPLOY);
    }
  }
}
