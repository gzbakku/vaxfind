const common = require("./common");


module.exports = {lookout:lookout};

async function lookout(location){

    let min_age = await input.select("select min age",["45","18"],{
        default:"18"
    });
    if(!min_age){
        return common.error("invalid min age");
    }
    min_age = Number(min_age); 

    console.log("\n---------------------------------\n");
    common.log("this step can take upto 24 hours to find any available booking slots for vaccine in india please keep checking the results frequently the vaccine slots are only available for a mere 100-186 seconds.");
    console.log("\n---------------------------------\n");
    let hold = spinner('Finding Vaccine Sessions').start();

    return new Promise((resolve,reject)=>{
        async function find(location){
            let lookup = await init(location,min_age);
            if(!lookup){
                setTimeout(()=>{
                    find(location);
                },5000);
                return;
            }
            if(lookup.centers.length > 0){
                hold.stop();
                console.log("\n\n");
                resolve(lookup.centers);
            } else {
                setTimeout(()=>{
                    find(location,min_age);
                },5000);
            }
        }
        find(location);
    });

}

async function init(location,min_age){

    let date = days_ahead();

    const get_sessions = await request.get("/v2/appointment/sessions/public/calendarByDistrict",{
        district_id:location.district_id,
        date:date,
    });
    if(!get_sessions){return common.error("failed-get_sessions");}

    let selected_centers = [];
    for(let center of get_sessions.centers){
        
        for(let session of center.sessions){
            if(session.min_age_limit === min_age){
                if(session.available_capacity > 0){
                    selected_centers.push(center);
                }
            }
        }
    }

    return {centers:selected_centers,min_age:min_age};

}

function days_ahead(day){
    if(!day){day = 0;}
    let now = new Date().getTime();
    let day_7 = 1000 * 60 * 60 * 24 * day;
    now += day_7;
    let later = new Date(now);
    let date = later.getDate();
    let month = later.getMonth()+1;
    let year = later.getFullYear();
    // date+=1;
    if(date < 10){date = `0${date}`;}
    if(month < 10){month = `0${month}`;}
    let parse = `${date}-${month}-${year}`;
    return parse;
}