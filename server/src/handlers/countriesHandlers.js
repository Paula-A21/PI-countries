const { getCountries } = require('../controllers/countries');
const {  countryById, countryByName } = require('../controllers/countriesName&Id');

const getAllCountries = (req, res) => {
    getCountries()
      .then((countries) => {
        res.status(200).json(countries);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
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

const getCountryByName = (req, res) => {

    const { name } = req.query;

    countryByName(name)
      .then((countries) => {
        res.status(200).json(countries);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
};

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
};