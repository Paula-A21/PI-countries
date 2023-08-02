const { getCountries } = require('../controllers/countries');
const {  countryById, countryByName } = require('../controllers/countriesName&Id');


const getAllCountries = async (req, res) => {

    try {
        const countries = await getCountries(); //el controller lo encuentra en la BD con un find all
        res.status(200).json(countries); //llamo a countries para que se creen y devolver la respuesta 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCountryById = async (req, res) => {
    const { id } = req.params;

    try { //le paso el requerimiento de la busqueda del pais especifico
        const countryId = await countryById(id);//me lo devuelve el controller con un find one
        res.status(200).json(countryId);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCountryByName = async (req, res) => {
    const { name } = req.query;

    try {
        const countryName = await countryByName(name); //le paso el nombre al controller
        res.status(200).json(countryName); //me lo devuelve con un fin all
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
};