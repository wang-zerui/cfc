const {
  // commandParse,
  // spinner,
  reportComponent,
} = require('@serverless-devs/core');
import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import Deploy from './lib/component/deploy'
import Remove from './lib/component/remove'
import { InputProps } from './common/entity';
import { COMPONENT_HELP_INFO } from './lib/help';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }
  /**
   * 部署
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
   * 移除
   * @param inputs
   * @returns
   */
   public async remove(inputs: InputProps):Promise<any> {
    const {
      endpoint,
      credentials,
      subCommand,
      props,
      // args,
      help,
      errorMessage
    } = await Deploy.handleInputs(inputs);
    await reportComponent('cfc', subCommand?`remove &(subCommand)`:'remove');
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }
    return await new Remove({credentials}).remove(endpoint, props,subCommand,credentials);
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
