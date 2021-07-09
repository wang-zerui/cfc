const CONFIGS = {
    endpoint: 'cfc.bj.baidubce.com',
    compName: 'cfc',
    compFullname: 'CFC',
    functionName: 'ServerlessDevsFunction',
    description(app) {
      return `This is a function in ${app} application`
    },
  }
  
module.exports = CONFIGS