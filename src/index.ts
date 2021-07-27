const {
  // commandParse,
  // spinner,
  reportComponent,
} = require('@serverless-devs/core');
import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import Deploy from './lib/component/deploy'
import { InputProps } from './common/entity';
import { COMPONENT_HELP_INFO } from './lib/help';
// import logger from './common/logger';

// import fs from 'fs';
// import path from 'path';
// import JSZip, { remove } from 'jszip';
// import get from 'lodash.get';
// import * as DEPLOY_HELP from './lib/help/deploy';
// let CONFIGS = require('./config');
// let zip = new JSZip();
// let CfcClient = require('@baiducloud/sdk').CfcClient;

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }
  /**
   * 部署函数
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps):Promise<any> {
    const {
      endpoint,
      credentials,
      subCommand,
      props,
      // args,
      help,
      errorMessage
    } = await Deploy.handleInputs(inputs);
    await reportComponent('cfc', subCommand?`deploy &(subCommand)`:'deploy');
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }

    return await new Deploy({endpoint, credentials}).deploy(props,subCommand,credentials,inputs);
  }

  /**
   * 帮助
   * @returns
   */
  public async help(): Promise<void> {
    await reportComponent('cfc', 'help');
    core.help(COMPONENT_HELP_INFO);
  }
}
