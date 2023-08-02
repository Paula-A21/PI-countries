const { getAllActivities } = require("../controllers/getAllActivities");


const getActivities = async (req, res) => {
    try {
        const activities = await getAllActivities(); //devuelve la actividad con un find all
        res.status(200).json(activities);             
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getActivities
}