const CONFIGS = {
    endpoint: 'cfc.bj.baidubce.com',
    compName: 'scf',
    compFullname: 'SCF',
    description(app) {
      return `This is a function in ${app} application`
    },
  }
  
module.exports = CONFIGS