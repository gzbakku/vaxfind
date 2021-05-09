const common = require("./common");


const prod_api = "https://cdn-api.co-vin.in/api";
const test_api = "https://api.demo.co-vin.in/api";

const active_api = prod_api;

global.parseurl = (u)=>{
    return `${active_api}${u}`;
}

module.exports = {
    post:post,
    get:get
};

async function post(api,data){
    
    return await fetch(parseurl(api),{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            'Content-Type':'application/json',
            "accept":"application/json"
        },
    })
    .then(async (data)=>{
        try {
            let parse = await data.text();
            try {
                let toJson = await JSON.parse(parse);
                return toJson;
            } catch(_){
                console.log(data);
                return common.error(`failed-parse_to_json-request => ${api} => ${parse}`);
            }
        } catch(_){
            console.log(data);
            return common.error(`failed-parse_to_text => ${api}`);
        }
    })
    .catch((e)=>{ console.log(e); return false;});

}

async function get(api,data,headers){

    if(!headers){
        headers = {};
    }

    headers["accept"] = "application/json";
    headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36";

    // console.log(headers);

    let collect = '';
    for(let key in data){
        if(collect.length === 0){
            collect += `${key}=${data[key]}`;
        } else {
            collect += `&${key}=${data[key]}`;
        }
    }

    if(collect.length > 0){
        api = `${api}?${collect}`;
    }

    // console.log(parseurl(api));

    let build = encodeURI(parseurl(api));

    return await fetch(build,{
        headers:headers
    })
    .then(async (data)=>{
        try {
            let parse = await data.text();
            try {
                let toJson = await JSON.parse(parse);
                return toJson;
            } catch(_){
                console.log(data);
                return common.error(`failed-parse_to_json-request => ${api} => ${parse}`);
            }
        } catch(_){
            console.log(data);
            return common.error(`failed-parse_to_text => ${api}`);
        }
    })
    .catch((e)=>{ console.log(e); return false;});

}