const { getAllActivities } = require("../controllers/getAllActivities");


const getActivities = async (req, res) => {
    try {
        const activities = await getAllActivities(); //se lo paso a countries para que se relacionen
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getActivities
}