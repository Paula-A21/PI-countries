const { getActivities } = require("../handlers/getActivities");
const { postActivity } = require("../handlers/postActivities");

const routerActivities = require('express').Router();

routerActivities.post('/form', postActivity);
routerActivities.get('/', getActivities);

module.exports = {
    routerActivities
}
