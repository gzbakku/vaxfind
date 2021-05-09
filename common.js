

module.exports = {
    log:log,
    error:error
};

function log(e){
    console.log(">>> " + e);
    return false;
}

function error(e){
    console.log("!!! " + e);
    return false;
}