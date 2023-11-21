const { createActivity } = require("../controllers/createActivities");

const postActivity = async (req, res) => {
    try{
        const { name, difficulty, duration, season, countries } = req.body;
        const newActivities = await createActivity (name, difficulty, duration, season, countries );

        res.status(200).json(newActivities);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postActivity
}