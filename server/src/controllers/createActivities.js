const {Activity, Country} = require ("../db");

const createActivity = async (name, difficulty, duration, season, countries) => {
    if (!name || !difficulty || !season || !countries) {
        throw new Error("Cannot create a new activity. Some fields are missing.");
    } else {

        let arrayOfCountries = []; //le agrego a cada país su actividad asociada

        for (const country of countries) {
            let addCountry = await Country.findByPk(country); //busco por ID para confirmar que exista ese país
            if (!addCountry) {
                throw new Error(`Country with ID ${country} not found.`); //si noexiste me devuelve este error
            }
            arrayOfCountries.push(addCountry); //le pusheo el pais encontrado al array
        }

        const activity = { //creo la actividad
            name,
            difficulty,
            duration: duration ? duration : null,
            season
        };

        const newActivity = await Activity.create(activity); //la creo con el modelo de la tabla para que se guarde en la bd

        await newActivity.setCountries(arrayOfCountries); //le relaciono el array con los paises en la tabla intermedia

        return newActivity;
    }
};

module.exports = {
    createActivity
};
