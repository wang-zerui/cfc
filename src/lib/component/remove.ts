import { ICredentials } from '../interface/profile';
import Client from '../client';
import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as HELP from '../help/remove';
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

export default class remove {
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
      core.help(HELP.REMOVE);
      return { errorMessage: `Does not support ${subCommand} command` };
    }
    
    if (parsedData.help) {
      rawData[0] ? core.help(HELP[`deploy_${subCommand}`.toLocaleUpperCase()]) : core.help(HELP.REMOVE);
      return { help: true, subCommand };
    }

    const props = inputs.props || {};

    const endProps = props;
    
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
    };
  }
  constructor({credentials}:{credentials: ICredentials}){
    Client.setCfcClient(credentials);
  }

  async removeFunction({endpoint, credentials, functionName}){
		return await new Function({endpoint, credentials}).remove(functionName);
  }

	async removeTrigger({credentials, props, functionBrn}){
		const target = functionBrn;
		const source = props.trigger.source;
		const data = props.trigger.data;
		const relationId = props.trigger.relationId;
		const IProps = {
      target,
      data,
      source,
      relationId
    }
		return await new Trigger(credentials).remove(IProps);
	}

	async getBrn(props, credentials){
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
    const endpoint = protocol + '://' + postEndpoint;
    const functionClient = new Function({endpoint, credentials});
    return await functionClient.getBrnByFunctionName(props.functionName);
  }

  async remove(endpoint, props, subCommand, credentials){
    if(subCommand === 'all') {
      const functionName = props.functionName;
      await this.removeFunction({endpoint, credentials, functionName});
			const functionBrn = props.functionBrn || await this.getBrn(props, credentials);
      await this.removeTrigger({credentials, props, functionBrn});
    }
    if(subCommand === 'function'){
			const functionName = props.functionName;
      return await this.removeFunction({endpoint, credentials, functionName});
    }
    if(subCommand === 'trigger'){
      const functionBrn = props.functionBrn || await this.getBrn(props, credentials);
      return await this.removeTrigger({credentials, props, functionBrn});
    }
    if(subCommand === 'help'){
      core.help(HELP.REMOVE);
    }
  }
}
