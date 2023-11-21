const { Country } = require("../db");
const axios = require("axios");
const URL = "http://localhost:5000";

const fetchCountries = async () => {
  try {
    const count = await Country.count();
    if (count > 0) {
      return;
    }

    const { data } = await axios.get(`${URL}/countries`);

    const createCountry = Promise.all(
      data.map((country) => {
        // Mapeo cada data que llega en el response del axios.get

        if (!country.capital) country.capital = ["Unknown"]; //si no existe la capital se guarda un valor unknown por defecto

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
    throw new Error("The countries were not found in the database" + error.message);
  }
};

module.exports = {
  fetchCountries,
};
