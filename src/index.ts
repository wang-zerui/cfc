import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps } from './common/entity';
import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'
import get from 'lodash.get';
let zip = new JSZip();

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
			fs.writeFile("hello.zip", data, function(err){/*...*/});


			return Buffer.from(data).toString('base64')

		} catch (e) {
			logger.error('File does not exist or file is invalid. please check')
		}
	}
  /**
   * demo 实例
   * @param inputs
   * @returns
   */

  public async deploy(inputs: InputProps) {
    let CfcClient =require('@baiducloud/sdk').CfcClient;
    const credentials = get(inputs, "credentials");
    const endpoint = get(inputs, "props.endpoint");
    const environment = get(inputs, "props.environment");
    const functionName = get(inputs, "props.functionName");
    const description = get(inputs, "props.description");
    const timeout = get(inputs, "props.timeout");
    const runtime = get(inputs, "props.runtime");
    const handler = get(inputs, "props.handler");
    const memorySize = get(inputs, "props.memorySize");
    const codeUri = get(inputs, "props.code.codeUri");
    const publish = get(inputs, "props.code.publish");
    const dryRun = get(inputs, "props.code.dryRun");
    const config = {
        endpoint: endpoint,
        credentials: {
            ak: credentials.AccessKeyID,
            sk: credentials.SecretAccessKey,
        }
	};
    logger.info(config);
    let client = new CfcClient(config);
    const ZipFile = await this.startZip(codeUri);
    let body =
      {
        'Code': {
          'ZipFile': ZipFile,
          'Publish': publish,
          'DryRun': dryRun
        },
        'Description': description,
        'Timeout': timeout,
        'FunctionName': functionName,
        'Handler': handler,
        'Runtime': runtime,
        'MemorySize': memorySize,
        'Environment': {
          'Variables': environment
        }
      };
    logger.info(body);
    client.createFunction(body).then(function (response) {
        // 创建函数成功
        logger.info("Creating Funtion");
        logger.info(response.body);
        return response;
    }).catch(function (err) {
      // 执行失败
      logger.error(err);
    });
  }
}

