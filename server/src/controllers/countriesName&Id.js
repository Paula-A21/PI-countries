const { Country, Activity } = require('../db');
const { Op } = require('sequelize');


const countryById = async (id) => {
    const countryById = await Country.findOne({
        where: { id },
        include: {
            model: Activity,
            attributes: ['name', 'duration', 'difficulty', 'season'],
            through:{
                attributes: []
            }
        }
    });

    if(!countryById) throw Error ('There is no country with that ID');

    return countryById;
};

const countryByName = async (name) => {
    const country = await Country.findAll({
        where: { name: {
            [Op.iLike]: `%${name}%`,
        }},
        include: {
            model: Activity,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    });
    
    if(!country) throw Error('The country with that name does not exist');
    
    return country;
};

module.exports = {
    countryById,
    countryByName
};