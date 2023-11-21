const { getAllActivities } = require("../controllers/getAllActivities");

const getActivities = (req, res) => {
  getAllActivities()
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  getActivities
};