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

  async create(props:IProps){
    const Target = props.target;
    const Source = props.source;
    const Data = props.data || {};
    let body = {
      Target,
      Source,
      Data,
    };
    return await Client.cfcClient
      .createRelation(body)
      .then(function (response) {
        return {response: response.body};
      })
      .catch(function (err) {
        return {error: err};
      });
  }

  async update(props:IProps){
    const Target = props.target;
    const RelationId = props.relationId;
    const Source = props.source;
    const Data = props.data;
    return await Client.cfcClient
      .updateRelation({
        Target,
        RelationId,
        Source,
        Data
      })
      .then((response) => {
        return response.body;
      })
      .catch((err) => {
        logger.error(err.message.Message);
        return {
          fail:true,
          error: err
        }
      })
  }

  async list(functionBrn: string, table?: boolean) {
    logger.info(`Getting listFunctions`);
    const data = await Client.cfcClient.listRelations({FunctionBrn: functionBrn})
      .then((response) => {
        return response.body;
      })
      .catch((err) => {
        logger.error(err.message.Message);
      });
    if (table) {
      tableShow(data.Relation, ['Source', 'Target', 'UpdatedAt']);
    } else {
      return data;
    }
  }

  async remove(props:IProps){
    const vm = core.spiner('Trigger deleting...');
    const Target = props.target;
    const Source = props.source;
    const RelationId = props.relationId;
    const options = {
      Target,
      Source,
      RelationId
    };

    const message = "Trigger relationId:" + RelationId;
    logger.info(message);
    return await Client.cfcClient.deleteRelation(options)
      .then((response) => {
        vm.succeed('Trigger deleted');
        return response.body;
      })
      .catch((err) => {
        vm.fail('Trigger failed.');
        logger.error(err.message.Message); 
        return err
      })
  }
}
