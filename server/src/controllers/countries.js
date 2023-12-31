const { Country, Activity } = require("../db");

const getCountries = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const countries = await Country.findAll({
        include: {
          model: Activity,
          through: {
            attributes: [],
          },
        },
      });

      if (!countries) {
        throw new Error("The countries weren't found in the database");
      }

      resolve(countries);
    } catch (error) {
      reject({ message: "An error occurred getting the countries: " + error.message });
    }
  });
};

module.exports = {
  getCountries
};


// //PROMESAS QUE NO FUNCIONARON
// // const getCountries = () => {
// //   return axios.get(`${URL}/countries`)
// //     .then(({ data }) => {
// //       return Promise.all(
// //         data.map((country) => { //mapeo cada data que llega en el response del axios.get
// //           return Country.create({
// //             id: country.cca3,
// //             name: country.name.official,
// //             flags: country.flags.png,
// //             continent: country.continent,
// //             capital: country.capital,
// //             subregion: country?.subregion,
// //             area: country?.area,
// //             population: country.population,
// //           });
// //         })
// //       );
// //     })
// //     .catch((error) => {
// //       throw new Error("There was an error creating countries");
// //     });
// // };
