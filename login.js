const common = require("./common");


module.exports = {
    init:init
};

async function init(){

    let txnId,mobile,otp,token;

    // mobile = "9560588602";
    // txnId = '5d33f197-d0f1-4582-9f09-3613a2cab3cf';
    // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI0Y2Q2OGU3Mi0xMzgwLTQyYjgtYjg0OC0xNTMxMWY5NjQwOGQiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiI0Y2Q2OGU3Mi0xMzgwLTQyYjgtYjg0OC0xNTMxMWY5NjQwOGQiLCJtb2JpbGVfbnVtYmVyIjo5NTYwNTg4NjAyLCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjcwODMzMzg0OTMxNDYwLCJ0eG5JZCI6IjVkMzNmMTk3LWQwZjEtNDU4Mi05ZjA5LTM2MTNhMmNhYjNjZiIsImlhdCI6MTYyMDU0NzMwNywiZXhwIjoxNjIwNTQ4MjA3fQ.sCQqce7FP4ssWdT1VxfSWHkNtTNvxak8uB7tJ7H4ZG4';

    if(true){
        if(!mobile){mobile = await input.text("valid 10 digit mobile please");}
        if(!mobile || isNaN(mobile)){return common.error("invalid_mobile");}
        const send_otp = await request.post("/v2/auth/public/generateOTP",{mobile:mobile});
        if(!send_otp){return common.error("failed-send_otp");}
        txnId = send_otp.txnId;
    }

    if(true){
        let otp = await input.text("valid otp");
        if(otp.length < 5){return common.error("invalid otp");}
        let hashed = sha256(otp);
        const confirm_otp = await request.post("/v2/auth/public/confirmOTP",{
            otp:hashed,
            txnId:txnId
        });
        if(!confirm_otp){return common.error("failed-confirm_otp");}
        return confirm_otp.token;
    }

    return token;

}