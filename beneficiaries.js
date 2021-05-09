const request = require("./request");


module.exports = {init:init};

async function init(token){

    let get_beneficiaries = await request.get("/v2/appointment/beneficiaries",null,{
        "Authorization":`${token}`
    });

    console.log(get_beneficiaries);

}