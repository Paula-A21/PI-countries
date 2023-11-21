const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const countryById = async (id) => {
  const countryById = await Country.findOne({
    where: { id },
    include: {
      model: Activity,
      attributes: ["name", "duration", "difficulty", "season"],
      through: {
        attributes: [],
      },
    },
  });

  if (!countryById) throw Error("There is no country with that ID");

  return countryById;
};

const countryByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Activity,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (!country || country.length === 0) {
        throw new Error("No country with that name was found ");
      }

      resolve(country);
    } catch (error) {
      reject({
        message: "An error occurred getting that country: " + error.message,
      });
    }
  });
};

module.exports = {
  countryById,
  countryByName,
};
