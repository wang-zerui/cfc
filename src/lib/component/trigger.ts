//@ts-ignore
import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import { tableShow } from '../utils'
import logger from '../../common/logger';

interface IProps { 
  target: string;
  source: string,
  relationId?: string;
  data?: object;
}

// const TRIGGER_COMMAND: string[] = ['create', 'list', 'info', 'remove', 'updateCode', 'updateConfig', 'getConfig']; 
// const TRIGGER_COMMAND_HELP_KEY = {
//   create: 'FunctionCreateInputsArgs',
//   list: 'FunctionListInputsArgs',
//   info: 'FunctionInfoInputsArgs',
//   remove: 'FunctionDeleteInputsArgs',
//   updateCode: 'UpdateCodeInputsArgs',
//   updateConfig: 'UpdateCofigInputsArgs',
//   getConfig: 'GetConfigInputsArgs',
// };

export default class Trigger {

  constructor( credentials: ICredentials ) {
    Client.setCfcClient(credentials);
  }

  async getBrnByFunctionName(functionName) {
    return await Client.cfcClient
      .getFunction(functionName)
      .then(function (response) {
        return response.body.Configuration.FunctionBrn;
      })
      .catch(function (err) {
        logger.error('获取brn错误');
        logger.error(err);
      });
  }

  async list(props){

  }

  async create(props:IProps){
    const Target = props.target;
    const Source = props.source;
    const Data = props.data || {};

    const vm = core.spinner('Trigger creating...');
    let body = {
      Target,
      Source,
      Data,
    };
    await Client.cfcClient
      .createRelation(body)
      .then(function (response) {
        vm.succeed('Trigger created');
        return response.body;
      })
      .catch(function (err) {
        vm.fail('Trigger create failed.');
        logger.error(err.message.Message);
        return err;
      });
  }

  async update()
}
