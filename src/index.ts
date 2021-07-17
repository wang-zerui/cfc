const {
  // HLogger,
  // ILogger,
  // getCredential,
  // help,
  // commandParse,
  spinner,
  // loadComponent,
  reportComponent
} = require('@serverless-devs/core')
import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps } from './common/entity';
import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'
import get from 'lodash.get';
// import { V4MAPPED } from 'dns';
let CONFIGS = require('./config')
let zip = new JSZip();
let CfcClient = require('@baiducloud/sdk').CfcClient;


export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }

  /**
   * 读取目录及文件
   * @param obj
   * @param nowPath
   */
  protected async readDir(obj, nowPath, targetDir) {
    try {
      const pathDir = nowPath.split('/')
      const _dir = pathDir[pathDir.length - 1]
      if (_dir.includes('.')) {
        obj.file(_dir, fs.readFileSync(`${nowPath}`))
      } else {
        let files = fs.readdirSync(nowPath)
        files.forEach((fileName, index) => {
          let fillPath = nowPath + '/' + fileName
          let file = fs.statSync(fillPath)
          if (file.isDirectory()) {
            let dirlist = zip.folder(path.relative(targetDir, fillPath))
            this.readDir(dirlist, fillPath, targetDir)
          } else {
            obj.file(fileName, fs.readFileSync(fillPath))
          }
        })
      }
    } catch (e) { }
  }

  /**
   * 开始压缩文件
   * @param codePath
   * @returns
   */
  protected async startZip(codePath: string) {
    const targetDir = path.resolve(codePath)
    try {
      await this.readDir(zip, targetDir, targetDir)
      const data = await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      })
      fs.writeFile('hello.zip', data, function (err) {/*...*/ });


      return Buffer.from(data).toString('base64')

    } catch (e) {
      logger.error('File does not exist or file is invalid. please check')
    }
  }
  /**
   * 处理输入
   * @param inputs
   * @returns 
   */
  protected async handleInputs(inputs: InputProps) {
    const credentials = get(inputs, 'credentials');
    const props = inputs.props;
    const ZipFile = await this.startZip(props.code.codeUri || './');
    const protocol = props.protocol || CONFIGS.defaultProtocol;
    const endpoint = props.endpoint || CONFIGS.defaultEndpoint;
    let tempInputs = {
      config: {
        endpoint: protocol + '://' + endpoint,
        credentials: {
          ak: credentials.AccessKeyID,
          sk: credentials.SecretAccessKey,
        }
      },
      body: {
        Code: {
          ZipFile,
        },
        Description: props.description || CONFIGS.description,
        FunctionName: props.functionName || CONFIGS.functionName,
        Runtime: props.runtime,
        MemorySize: props.memorySize || CONFIGS.memorySize,
        Handler: props.handler || CONFIGS.handler(props.runtime),
        Timeout: props.timeout || CONFIGS.timeout,
      }
    }
    if (props.code.publish) {
      tempInputs.body.Code['Publish'] = props.code.publish;
    }
    if (props.code.dryRun) {
      tempInputs.body.Code['DryRun'] = props.code.dryRun;
    }
    const keys = ['Environment', 'LogType', 'DeadLetterTopic', 'LogBosDir'];
    for (let i of keys) {
      let value = get(props, i.toLowerCase());
      if (value) {
        tempInputs[i] = value;
      }
    }
    const cfcInputs = tempInputs;
    return cfcInputs;
  }
  /**
	 * 通过函数名获取FunctionBrn
	 */
	protected async getBrnByFunctionName(inputs:InputProps) {
    const credentials = get(inputs, 'credentials');
    const FunctionName = inputs.props.functionName;
    const config = {
      credentials: {
          ak: credentials.AccessKeyID,
          sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    let functionBrn;
    await client.getFunction(FunctionName).then(function (response){
      functionBrn = response.body.Configuration.FunctionBrn;
    }).catch(function (err){
      logger.error("获取brn错误");
      logger.error(err);
    });
    return functionBrn;
  }
  /**
	 * 获得触发器列表
	 */
  public async listtrigger(inputs: InputProps) {
    const credentials = get(inputs, 'credentials');
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    logger.info(typeof (client));
    if (inputs.props.functionName || inputs.props.functionBrn) {
      let FunctionBrn = inputs.props.functionBrn || await this.getBrnByFunctionName(inputs);
      logger.info(FunctionBrn);
      client.listRelations({ FunctionBrn }).then(function (response) {
        logger.info("触发器列表：");
        logger.info(response.body);
      }).catch(function (err) {
        logger.error("获取触发器列表失败");
        logger.error(err);
      });
    } else {
      logger.error("请提供FunctionName或FunctionBrn");
    }
  }
  /**
   * 更新函数代码
   * @param inputs
   * @returns
  */
  protected async updateCode(inputs: InputProps): Promise<any> {          //TODO:修改参数，不再进行多余处理，使用scfInputs
    const props = inputs.props;
    const functionName = props.functionName;
    const codeUri = props.code.codeUri || CONFIGS.codeUri;
    const vm1 = spinner('File compressing...');
    const ZipFile = await this.startZip(codeUri);
    vm1.succeed('File compression completed');
    let body = {
      ZipFile,
    }
    if (props.code.publish) {
      body['Publish'] = props.code.publish;
    }
    if (props.code.dryRun) {
      body['DryRun'] = props.code.dryRun;
    }
    const credentials = get(inputs, 'credentials');
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    const vm2 = spinner('Function deploying...');
    let functionBrn = "";
    await client.updateFunctionCode(functionName, body).then(function (response) {
      vm2.succeed('Function deployed');
      // TODO:处理输出
      // logger.info(response);
      functionBrn = response.body.FunctionBrn;
    }).catch(function (err) {
      vm2.fail('Function deploy failed');
      // logger.error(err);
    })
    return functionBrn;
  }

  /**
   * 更新函数配置
   * @param inputs
   * @returns
  */
  protected async updateConfig(inputs: InputProps) {
    const vm = spinner('Function configuration updating...');
    const props = inputs.props;
    const FunctionName = props.functionName;
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
    
    const credentials = get(inputs, 'credentials');
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    await client.updateFunctionConfiguration(FunctionName, body).then(function (response) {
      vm.succeed('Function configuration update completed')
      // TODO:结果处理
      // logger.info(response);
    }).catch(function (err) {
      vm.fail('Function configuration update failed')
      logger.error(err.body);
    })
  }

  /**
   * 获取触发器列表
   * @param inputs
   * @returns
   */
  protected async checkTriggers(inputs: InputProps, functionBrn: String): Promise<any> {
    const credentials = get(inputs, 'credentials');
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    let FunctionBrn = inputs.props.functionBrn;
    logger.info(FunctionBrn);
    client.listRelations({ FunctionBrn }).then(function (response) {
      logger.info("触发器列表：");
      logger.info(response.body);
    }).catch(function (err) {
      logger.error("获取触发器列表失败");
      logger.error(err);
    });
  }
  /**
   * 更新触发器
   * @param inputs
   * @returns
   */
  protected async deployTrigger(inputs: InputProps, functionBrn: String) {
    const credentials = get(inputs, 'credentials');
    const props = inputs.props;
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);

    const Target = functionBrn;
    const RelationId = props.trigger.relationId;
    const Source = props.trigger.source;
    const Data = props.trigger.data || {};

    const vm = spinner('Trigger deploying...');
    if(!Source) {
      vm.fail('Please provide the type of the trigger');
    }
    if (!RelationId) {
      const body = {
        Target,
        Source,
        Data
      };
      await client.createRelation(body).then(function (response) {
        // TODO:添加输出处理
        vm.succeed('Trigger deployed');
        // logger.info(response.body);
        return response;
      }).catch((response)=>{
        vm.fail('Trigger deploy failed.');
        if(response.message.Code === 'ResourceConflictException'){
          logger.error(response.message.Message + ', if you want to update your trigger, please provide relationId');
        }else{
          logger.error(response.message.Message);
        }
      })
      return;
    } else {
      let body = {
        RelationId,
        Target,
        Source,
        Data,
      }
      await client.updateRelation(body).then(function (response) {
        vm.succeed('Trigger deployed');
        // logger.info(response.body);
      }).catch(function (err) {
        vm.fail('Trigger deploying failed');
        // logger.error("Updating trigger failure.");
        logger.error(err);
      })
    }
  }
  /**
   * 删除触发器
   * @param inputs
   * @returns
   */
  public async deletetrigger(inputs: InputProps) {
    const credentials = get(inputs, 'credentials');
    const props = inputs.props;
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    // const keys = ['relationsId', 'source', 'data'];
    const RelationId = props.trigger.relationId;
    const Source = props.trigger.source;
    if (!RelationId) {
      logger.error("请提供RelationId");
      return;
    }
    if (!Source) {
      logger.error("请提供Source");
    }
    let client = new CfcClient(config);
    if (inputs.props.functionName || inputs.props.functionBrn) {
      let FunctionBrn = inputs.props.functionBrn;
      let body = {
        RelationId,
        Target: FunctionBrn,
        Source,
      }
      logger.info("Deletting trigger");
      client.deleteRelation(body).then(function (response) {
        logger.info("Delete trigger successfully");
        logger.info(response.body);
      }).catch(function (err) {
        logger.error(err);
      })
    } else {
      logger.error("请提供FunctionName或FunctionBrn");
    }
  }
  /**
   * 删除函数
   * @param inputs
   * @returns
   */
  public async deletefunction(inputs: InputProps) {
    const credentials = get(inputs, 'credentials');
    const props = inputs.props;
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    if (props.functionName) {
      logger.info("Deleting function");
      client.deleteFunction(props.functionName).then(function (response) {
        logger.info("Delete successfully");
        logger.info(response.body);
      }).catch(function (err) {
        logger.error(err);
      })
    } else {
      logger.error("请提供FunctionName");
    }
  }

  /**
   * 检查函数是否已有
   * @param client
   * @param functionName
   * @returns
   */
  protected async checkCreated(client, functionName: String): Promise<any> {
    let result = false;
    await client.listFunctions().then((response) => {
      for (let i of response.body.Functions) {
        if (i.FunctionName === functionName) {
          result = true
        }
      }
    }).catch((err) => {
      logger.error(err);
    })
    return result;
  }

  /**
   * 部署函数
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps) {
    //处理输入
    const scfInputs = await this.handleInputs(inputs);
    reportComponent('cfc', {
      'commands': 'deploy',
    });
    let client = new CfcClient(scfInputs.config);
    let isCreated = await this.checkCreated(client, scfInputs.body.FunctionName);
    let _that = this;
    if (isCreated) {                                                                // 更新代码及配置
      let functionBrn = await _that.updateCode(inputs);
      // logger.info(functionBrn);
      await _that.updateConfig(inputs);
      await _that.deployTrigger(inputs, functionBrn);                                   // 更新触发器
    } else {                                                                        // 创建函数
      const vm = spinner('Function deploying...');
      await client.createFunction(scfInputs.body).then(function (response) {
        vm.succeed('Function deploy completed');
        // logger.info(response.body);                                               // TODO:添加输出处理
        return response;
      }).then(function (response) {
        if (inputs.props.trigger) {
          const functionBrn = response.body.FunctionBrn;                          // 从返回值获取
          _that.deployTrigger(inputs, functionBrn);                               // 部署触发器
        }
      }).catch(function (err) {
        // 执行失败
        vm.fail('Function deploy failed');
        if(err.message.Code === 'ResourceConflictException'){
          logger.error(err.message.Message);
        }
      });
    }
  }
}

