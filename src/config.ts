const LANGS = ["nodejs", "python", "java", "golang", "php", "lua", "dotnetcore", "powershell"]
const getLang = (runtime) => {
  for (let i = 0; i < LANGS.length; i++) {
    if (runtime.indexOf(LANGS[i]) === 0) {
      return LANGS[i]
    }
  }
  return 'nodejs'
}
const CONFIGS = {
    compName: 'cfc',
    compFullname: 'CFC',
    functionName: 'ServerlessDevsFunction',
    timeout: 3,
    memorySize: 128,
    description(app) {
      return `This is a function in ${app} application`
    },
    endpoints: ["cfc.bj.baidubce.com", "cfc.gz.baidubce.com", "cfc.su.baidubce.com"],
    defaultEndpoint: "cfc.bj.baidubce.com",
    protocols: ['http', 'https'],
    triggerSourceTypes: ["dueros", "bos/your-bucket-name", "duedge", "cfc-http-trigger/v1/CFCAPI", "cfc-crontab-trigger/v1/"]
  }
  
module.exports = CONFIGS