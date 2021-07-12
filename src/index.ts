const {
  // HLogger,
  // ILogger,
  // getCredential,
  // help,
  // commandParse,
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
let CONFIGS = require('./config')
let zip = new JSZip();
let CfcClient = require('@baiducloud/sdk').CfcClient;


export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }
  /**
	 * 通过函数名获取FunctionBrn
	 */
	public async getBrnByFunctionName(inputs:InputProps) {
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
						let dirlist = zip.folder( path.relative(targetDir, fillPath))
						this.readDir(dirlist, fillPath, targetDir)
					} else {
						obj.file(fileName, fs.readFileSync(fillPath))
					}
				})
			}
		} catch (e) {}
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
			fs.writeFile('hello.zip', data, function(err){/*...*/});


			return Buffer.from(data).toString('base64')

		} catch (e) {
			logger.error('File does not exist or file is invalid. please check')
		}
	}
  /**
   * 部署函数
   * @param inputs
   * @returns
   */
  private async handleInputs(inputs: InputProps) {
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
      body:{
        Code:{
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
    //TODO:这里可以进行简化
    if(props.code.publish){
      tempInputs.body.Code['Publish'] = props.code.publish;
    }
    if(props.code.dryRun){
      tempInputs.body.Code['DryRun'] = props.code.dryRun;
    }
    if(props.environment){
      tempInputs['Environment'] = {'Variables': inputs.props.environment};
    }
    if(props.logType){
      tempInputs['LogType'] = props.logType;
    }
    if(props.vpcConfig){
      tempInputs['LogType'] = props.vpcConfig;
    }
    if(props.deadLetterTopic){
      tempInputs['DeadLetterTopic'] = props.deadLetterTopic;
    }
    if(props.logBosDir){
      tempInputs['LogBosDir'] = props.logBosDir;
    }
    const cfcInputs = tempInputs;
    return cfcInputs;
  }

  /**
   * 更新函数代码
   * @param inputs
   * @returns
  */
  public async updatecode(inputs: InputProps) {
    const props = inputs.props;
    const functionName = props.functionName;
    const codeUri = props.code.codeUri || CONFIGS.codeUri;
    const ZipFile = await this.startZip(codeUri);
    let body = {
      ZipFile,
    }
    if(props.code.publish) {
      body['Publish'] = props.code.publish;
    }
    if(props.code.dryRun) {
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
    logger.info('Updating function code...')
    client.updateFunctionCode(functionName, body).then(function (response) {
      logger.info('Update successfully!');
      // TODO:处理输出
      logger.info(response);
    }).catch(function (err) {
      logger.error('更新代码失败');
      logger.error(err);
    })
  }

  /**
   * 更新函数配置
   * @param inputs
   * @returns
  */
  public async updateconfig(inputs: InputProps) {
    const props = inputs.props;
    const FunctionName =  props.functionName;
    if(!FunctionName){
      logger.error('未填写函数名');
      return;
    }
    
    const keys = ['Description', 'Timeout', 'Handler', 'Runtime', 'Environment'];
    let body = {};
    for(let i of keys){
      let value = get(props, i.toLowerCase());
      if(value){
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
    logger.info("Updating function configuration...")
    client.updateFunctionConfiguration(FunctionName, body).then(function(response){
      logger.info('Update successfully!');
      // TODO:结果处理
      logger.info(response);
    }).catch(function (err) {
      logger.error(err);
    })
  }
  
  /**
   * 获取触发器列表
   * @param inputs
   * @returns
   */
  public async listtriggers(inputs: InputProps) {
    const credentials = get(inputs, 'credentials');
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      }
    };
    let client = new CfcClient(config);
    if(inputs.props.functionName  || inputs.props.functionBrn){
      let FunctionBrn = inputs.props.functionBrn || await this.getBrnByFunctionName(inputs);
      logger.info(FunctionBrn);
      client.listRelations({FunctionBrn}).then(function(response){
        logger.info("触发器列表：");
        logger.info(response.body);
      }).catch(function(err){
        logger.error("获取触发器列表失败");
        logger.error(err);
      });
    }else{
      logger.error("请提供FunctionName或FunctionBrn");
    }
  }
  /**
   * 更新触发器
   * @param inputs
   * @returns
   */
   public async updatetrigger(inputs: InputProps) {
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
    const Data = props.trigger.data || {};
    if(!RelationId){
      logger.error("请提供RelationId");
      return;
    }
    if(!Source){
      logger.error("请提供Source");
    }
    let client = new CfcClient(config);
    if(inputs.props.functionName || inputs.props.functionBrn){
      let FunctionBrn = inputs.props.functionBrn || await this.getBrnByFunctionName(inputs);
      let body = {
        RelationId,
        Target: FunctionBrn,
        Source,
        Data,
      }
      logger.info("Updating trigger");
      client.updateRelation(body).then(function(response){
        logger.info("Update successfully");
        logger.info(response.body);
      }).catch(function(err){
        logger.error(err);
      })
    }else{
      logger.error("请提供FunctionName或FunctionBrn");
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
    if(!RelationId){
      logger.error("请提供RelationId");
      return;
    }
    if(!Source){
      logger.error("请提供Source");
    }
    let client = new CfcClient(config);
    if(inputs.props.functionName || inputs.props.functionBrn){
      let FunctionBrn = inputs.props.functionBrn || await this.getBrnByFunctionName(inputs);
      let body = {
        RelationId,
        Target: FunctionBrn,
        Source,
      }
      logger.info("Deletting trigger");
      client.deleteRelation(body).then(function(response){
        logger.info("Delete trigger successfully");
        logger.info(response.body);
      }).catch(function(err){
        logger.error(err);
      })
    }else{
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
    if(props.functionName){
      logger.info("Deleting function");
      client.deleteFunction(props.functionName).then(function(response){
        logger.info("Delete successfully");
        logger.info(response.body);
      }).catch(function(err){
        logger.error(err);
      })
    }else{
      logger.error("请提供FunctionName");
    }
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
    client.createFunction(scfInputs.body).then(function (response) {
      //创建函数
      logger.info('Creating Funtion...');
      // TODO:添加输出处理
      logger.info(response.body);
      return response;
    }).then(function (response) {
      //创建触发器
      logger.info('Creating Trigger...');
      let body = {
        'Target': response.body.FunctionBrn,
        'Source': inputs.props.trigger.source,
        'Data': inputs.props.trigger.data,
      }
      return client.createRelation(body);
    }).then(function (response) {
      // TODO:添加输出处理
      logger.info(response.body);
      return response;
    }).catch(function (err) {
      // 执行失败
      logger.error(err);
    });
  }
}

