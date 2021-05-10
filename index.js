
const common = require('./common');
const request = require('./request');
global.common = require("./common");
global.input = require("input");
global.fetch = require('node-fetch');
global.request = require("./request");
global.sha256 = require("sha256");
global.notifier = require("node-notifier");
global.spinner = require("ora");

const login = require("./login");
const location = require("./location");
const sessions = require("./sessions");
const beneficiaries = require("./beneficiaries");

main();

async function main(){

    // let login_now = await login.init();
    // if(!login_now){
    //     return common.error("failed-login");
    // }

    // let get_beneficiaries = await beneficiaries.init(login_now);
    // if(!get_beneficiaries){
    //     return common.error("failed-get_beneficiaries");
    // }

    // return;

    let locate = await location.init();
    
    let find_sessions = await sessions.lookout(locate);
    if(find_sessions === false){
        return common.error("failed-find-sessions");
    }

    console.log(find_sessions);

    notifier.notify({
        title: 'vaxfind',
        message: 'cowin active session found!'
    });
    
    return;

}