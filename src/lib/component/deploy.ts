import { ICredentials } from '../interface/profile';
import Client from '../client';
import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as HELP from '../help/deploy';
import Function from './function'
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
    Client.setCfcClient(endpoint, credentials);
  }

  async deployFunction({props, credentials}){
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
    const endpoint = protocol + '://' + postEndpoint;
    const functionClient = new Function({endpoint, credentials});
    return await functionClient.create(props);
  }

  async deploy(props, subCommand, credentials, inputs){
    if(subCommand === 'function'){
      return await this.deployFunction({props, credentials});
    }
    if(subCommand === 'help'){
      core.help(HELP.DEPLOY);
    }
  }
}
