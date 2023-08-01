const {Activity, Country} = require ("../db");

const createActivity = async (name, difficulty, duration, season, countries) => {
    if (!name || !difficulty || !season || !countries) {
        throw new Error("Cannot create a new activity. Some fields are missing.");
    } else {
        let arrayOfCountries = [];

        for (const country of countries) {
            let addCountry = await Country.findByPk(country);
            if (!addCountry) {
                throw new Error(`Country with ID ${country} not found.`);
            }
            arrayOfCountries.push(addCountry);
        }

        const activity = {
            name,
            difficulty,
            duration: duration ? duration : null,
            season,
        };

        const newActivity = await Activity.create(activity);

        await newActivity.setCountries(arrayOfCountries);

        return newActivity;
    }
};

module.exports = {
    createActivity
};
