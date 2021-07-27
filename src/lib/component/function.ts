//@ts-ignore
import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface/profile';
import Client from '../client';
import get from 'lodash.get';
import { startZip, tableShow } from '../utils'
import logger from '../../common/logger';
let CONFIGS = require('../config');

//@ts-ignore
interface IProps { 
  endpoint: string;
  description?: string;
  functionName?: string;
}

const FUNCTION_COMMAND: string[] = ['create', 'list', 'info', 'remove', 'updateCode', 'updateConfig', 'getConfig']; 
const FUNCTION_COMMAND_HELP_KEY = {
  create: 'FunctionCreateInputsArgs',
  list: 'FunctionListInputsArgs',
  info: 'FunctionInfoInputsArgs',
  remove: 'FunctionDeleteInputsArgs',
  updateCode: 'UpdateCodeInputsArgs',
  updateConfig: 'UpdateCofigInputsArgs',
  getConfig: 'GetConfigInputsArgs',
};

export default class Function {
  /*
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y'],
      string: ['endpoint', 'function-name', 'description'],
      alias: { help: 'h'},
    });

    // 注意有三种不同的return方式
    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    // if (!rawData.length) {
    //   return { help: true, helpKey: 'FunctionInputsArgs' };
    // }

    const subCommand = rawData[0] || 'all';
    logger.debug(`version subCommand: ${subCommand}`);

    if (!FUNCTION_COMMAND.includes(subCommand)) {
      // 没有对应参数时返回
      return {
        help: true,
        helpKey: 'FunctionInputsArgs',
        errorMessage: `Does not support ${subCommand} command`,
      };
    }

    if (parsedData.help) {
      // 
      return { help: true, helpKey: FUNCTION_COMMAND_HELP_KEY[subCommand], subCommand };
    }

    const props = inputs.props || {};

    const endProps: IProps = {
      endpoint: parsedData.endpoint || props.endpoint,
      description: parsedData.description,
      functionName: parsedData['function-name'] || props.functionName,
      // version: parsedData.id,
      // assumeYes: parsedData.y,
    };

    if (!endProps.endpoint) {
      throw new Error('Not fount region');
    }
    if (!endProps.functionName) {
      throw new Error('Not fount serviceName');
    }

    const credentials: ICredentials = inputs.credentials || await core.getCredential(inputs?.project?.access);
    logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);

    return {
      credentials,
      subCommand,
      endProps,
      // table: parsedData.table,
    };
  }
  */

  constructor({ endpoint, credentials }: { endpoint: string; credentials: ICredentials }) {
    Client.setCfcClient(endpoint, credentials);
  }

  async create(props){
    const ZipFile = await startZip(props.code.codeUri || './');
    let tempInputs = {
      Code: {
        ZipFile,
      },
      Description: props.description || CONFIGS.description,
      FunctionName: props.functionName || CONFIGS.functionName,
      Runtime: props.runtime,
      MemorySize: props.memorySize || CONFIGS.memorySize,
      Handler: props.handler || CONFIGS.handler(props.runtime),
      Timeout: props.timeout || CONFIGS.timeout,
    };
    if (props.code.publish) {
      tempInputs.Code['Publish'] = props.code.publish;
    }
    if (props.code.dryRun) {
      tempInputs.Code['DryRun'] = props.code.dryRun;
    }
    const keys = ['Environment', 'LogType', 'DeadLetterTopic', 'LogBosDir'];
    for (let i of keys) {
      let value = get(props, i.toLowerCase());
      if (value) {
        tempInputs[i] = value;
      }
    }
    const body = tempInputs;

    const vm = core.spinner('Function Creating');
    await Client.cfcClient
      .createFunction(body)
      .then((response) => {
        vm.succeed('Function deploy completed');
        // logger.info(response.body);                                               // TODO:添加输出处理
        return response;
      })
      .catch((err) => {
        vm.fail('Function deploy failed');
        logger.error(err.message.Message);
      });
  }
  
  async updateCode(props){
    const functionName = props.functionName;
    if(!functionName){
      throw new Error('Not found functionName');
    }
    const codeUri = props.code.codeUri || CONFIGS.codeUri;
    const vm1 = core.spinner('File compressing...');
    const ZipFile = await startZip(codeUri);
    vm1.succeed('File compression completed');
    let body = {
      ZipFile,
    };
    if (props.code.publish) {
      body['Publish'] = props.code.publish;
    }
    if (props.code.dryRun) {
      body['DryRun'] = props.code.dryRun;
    }
    const vm2 = core.spinner('Function deploying...');
    let functionBrn: any;
    await Client.cfcClient
      .updateFunctionCode(functionName, body)
      .then(function (response) {
        vm2.succeed('Function deployed');
        // TODO:处理输出
        // logger.info(response);
        functionBrn = response.body.FunctionBrn;
      })
      .catch(function (err) {
        vm2.fail('Function deploy failed');
        // logger.error(err);
      });
    return functionBrn;
  }

  async updateConfig(props){
    const vm = core.spinner('Function configuration updating...');
    const FunctionName = props.functionName;
    if(!FunctionName){
      throw new Error('Not found functionName');
    }
    if (!FunctionName) {
      vm.fail('执行失败，未填写函数名');
      return;
    }

    const keys = ['Description', 'Timeout', 'Handler', 'Runtime', 'Environment'];
    let body = {};
    for (let i of keys) {
      let value = get(props, i.toLowerCase());
      if (value) {
        body[i] = value;
      }
    }

    await Client.cfcClient
      .updateFunctionConfiguration(FunctionName, body)
      .then(function (response) {
        vm.succeed('Function configuration update completed');
        // TODO:结果处理
        // logger.info(response);
      })
      .catch(function (err) {
        vm.fail('Function configuration update failed');
        logger.error(err.body);
      });
  }

  async info(props){
    const FunctionName = props.functionName;
    if(!FunctionName){
      throw new Error('Not found functionName');
    }
    await Client.cfcClient
      .getFunction(FunctionName)
      .then((response) => {
        
      })
      .catch((err) => {
        logger.error('获取函数信息失败');
        logger.error(err.body);
      })
  }

  async list(table?: boolean) {
    logger.info(`Getting listFunctions`);
    const data = await Client.cfcClient.listFunctions;
    if (table) {
      tableShow(data, ['FunctionName', 'Description', 'UpdatedAt', 'LastModified', 'Region']);
    } else {
      return data;
    }
  }

  async remove(props){
    const FunctionName = props.functionName;
    if(!FunctionName){
      throw new Error('Not found functionName');
    }
    const vm = core.spinner('Function deleting...');
    await Client.cfcClient
      .deleteFunction(FunctionName)
      .then((response) => {
        vm.succeed('Function deleted');
        return response;
      })
      .catch((err) => {
        logger.error('函数删除错误');
        logger.error(err.message.Message);
      })
  }

  async getConfig(props){
    const FunctionName = props.functionName;
    if(!FunctionName){
      throw new Error('Not found functionName');
    }
    await Client.cfcClient.getFunctionConfiguration(FunctionName)
      .then((response) => {
        logger.info(response.body);
        return response.body;
      })
      .catch((err) => {
        logger.error('函数配置获取错误');
        logger.error(err.message.Message);
      })
  }
}
