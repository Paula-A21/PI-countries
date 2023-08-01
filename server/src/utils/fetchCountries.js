const { Country } = require('../db');
const axios = require('axios');
const {URL} = require('./URL')

const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${URL}/countries`);
        if(await Country.count() > 0){
          return;
        }

        const createCountry = Promise.all(
          data.map((country) => {
            // Mapeo cada data que llega en el response del axios.get
  
            if(!country.capital) country.capital = ['Unknown']; //si no existe la capital se guarda un valor unknown por defecto
  
            const newCountry = Country.create({
              id: country.cca3,
              name: country.name.common,
              flags: country.flags.png,
              continent: country.continent[0], //saco el primer valor de los arrays
              capital: country.capital[0], 
              subregion: country?.subregion,
              area: country?.area,
              population: country.population,
            });
            return newCountry;
          })
        );
        return createCountry;

      } catch (error) {
        throw new Error('The countries are not found in the database');
      }
};


module.exports = {
  fetchCountries
};