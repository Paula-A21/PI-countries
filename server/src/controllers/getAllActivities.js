const {Activity} = require("../db.js");

const getAllActivities = async () => {
    
    const ACTIVITIES = await Activity.findAll();
    
    if(ACTIVITIES.length === 0) throw Error ('There are no activities');
    
    return ACTIVITIES;    
};                                             


module.exports = {
    getAllActivities
}
