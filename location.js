const common = require("./common");


module.exports = {init:init};

async function init(){

    // return {state_id:34,district_id:651};

    const get_states = await request.get("/v2/admin/location/states");
    if(!get_states){return common.error("failed-get_states");}

    let state_name_array = [];
    let state_book = {};
    for(let state of get_states.states){
        state_name_array.push(state.state_name);
        state_book[state.state_name] = state.state_id;
    }

    let selected_state = await input.select("please select your state",state_name_array,{
        // default:'Uttar Pradesh'
    });
    if(!selected_state){
        return common.error("failed-select_state");
    }

    let state_id = state_book[selected_state];

    const get_districts = await request.get(`/v2/admin/location/districts/${state_id}`);
    if(!get_districts){return common.error("failed-get_districts");}

    let district_name_array = [];
    let district_book = {};
    for(let district of get_districts.districts){
        district_name_array.push(district.district_name);
        district_book[district.district_name] = district.district_id;
    }

    let selected_district = await input.select("please select your district",district_name_array,{
        // default:'Ghaziabad'
    });
    if(!selected_district){
        return common.error("failed-selected_district");
    }

    let district_id = district_book[selected_district];

    return {state_id:state_id,district_id:district_id};

}