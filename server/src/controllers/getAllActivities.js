const { Activity } = require("../db.js");

const getAllActivities = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const activities = await Activity.findAll();
  
        if (activities.length === 0) {
          throw new Error('There are no activities');
        }
  
        resolve(activities);
      } catch (error) {
        reject({ message: "An error occurred getting the activities: " + error.message });
      }
    });
  };
  
  module.exports = {
    getAllActivities
  };