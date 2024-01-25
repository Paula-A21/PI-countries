import axios from "axios";
import {
  SET_ORDER,
  SET_FILTER_CONTINENT,
  SET_FILTER_ACTIVITY,
  COMBINED_FILTERS,
  GET_COUNTRIES,
  GET_ACTIVITIES,
  SEARCH_COUNTRY,
  CLEAR_FILTERS,
} from "./action-types";

import { VITE_ENDPOINT } from "../utils/ENDPOINT";

export const setOrder = (order) => {
  return { type: SET_ORDER, payload: order };
};

export const setFilterContinent = (continent) => {
  return { type: SET_FILTER_CONTINENT, payload: continent };
};

export const setFilterActivity = (activity) => {
  return { type: SET_FILTER_ACTIVITY, payload: activity };
};

export const getCountries = () => {
  return (dispatch) => {
    return axios
      .get(`${VITE_ENDPOINT}/countries`)
      .then(({ data }) => {
        if (!data)
          throw Error("The countries were not found, check the database");

        dispatch({
          type: GET_COUNTRIES,
          payload: data,
        });
      })
      .catch((error) => console.log(error.message));
  };
};

export const getActivities = () => {
  return (dispatch) => {
    return axios
      .get(`${VITE_ENDPOINT}/activities`)
      .then(({ data }) => {
        dispatch({
          type: GET_ACTIVITIES,
          payload: data,
        });
      })
      .catch((error) => console.log(error.message));
  };
};

export const searchCountry = (name) => {
  return (dispatch) => {
    return axios
      .get(`${VITE_ENDPOINT}/countries/name?name=${name}`)
      .then(({ data }) => {
        dispatch({
          type: SEARCH_COUNTRY,
          payload: data,
        });
      })
      .catch((error) => console.log(error.message));
  };
};

export const clearFilters = () => {
  return { type: CLEAR_FILTERS };
};

export const combinedFilters = (order, continent, activity) => {
  return (dispatch) => {
    return axios
      .get(`${VITE_ENDPOINT}/countries`)
      .then(({ data }) => {
        let filterCountries = data;

        if (order && !continent && !activity) {
          // Filtrar y ordenar si se proporciona solo el parámetro 'order'
          if (order === "") filterCountries;
          else if (order === "asc") {
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
          } else if (order === "desc") {
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
          } else if (order === "lowerPop") {
            filterCountries.sort((a, b) => a.population - b.population);
          } else if (order === "higherPop") {
            filterCountries.sort((a, b) => b.population - a.population);
          }
        } else if (!order && continent && !activity) {
          // Filtrar por continente si se proporciona solo el parámetro 'continent'
          filterCountries = filterCountries.filter(
            (country) => country.continent === continent
          );
        } else if (!order && !continent && activity) {
          // Filtrar por actividad si se proporciona solo el parámetro 'activity'
          if (activity === "") filterCountries;
          else {
            filterCountries = filterCountries.filter(
              (country) =>
                country.Activities.some((act) => act.name === activity) //some comprueba si almenos un elemento cumple con la condicion
            );
          }
        } else if (order && continent && !activity) {
          // Filtrar por orden y continente si se proporcionan 'order' y 'continent'
          filterCountries = filterCountries.filter(
            (country) => country.continent === continent
          );
          if (order === "") filterCountries;
          else if (order === "asc") {
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
          } else if (order === "desc") {
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
          } else if (order === "lowerPop") {
            filterCountries.sort((a, b) => a.population - b.population);
          } else if (order === "higherPop") {
            filterCountries.sort((a, b) => b.population - a.population);
          }
        } else if (order && !continent && activity) {
          // Filtrar por orden y actividad si se proporcionan 'order' y 'activity'
          if (activity === "") filterCountries;
          else {
            filterCountries = filterCountries.filter((country) =>
              country.Activities.some((act) => act.name === activity)
            );
          }
          if (order === "") filterCountries;
          else if (order === "asc") {
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
          } else if (order === "desc") {
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
          } else if (order === "lowerPop") {
            filterCountries.sort((a, b) => a.population - b.population);
          } else if (order === "higherPop") {
            filterCountries.sort((a, b) => b.population - a.population);
          }
        } else if (!order && continent && activity) {
          // Filtrar por continente y actividad si se proporcionan 'continent' y 'activity'
          filterCountries = filterCountries.filter(
            (country) => country.continent === continent
          );
          if (activity === "") filterCountries;
          else {
            filterCountries = filterCountries.filter((country) =>
              country.Activities.some((act) => act.name === activity)
            );
          }
        } else if (order && continent && activity) {
          // Filtrar por orden, continente y actividad si se proporcionan 'order', 'continent' y 'activity'
          filterCountries = filterCountries.filter(
            (country) => country.continent === continent
          );
          if (activity === "") filterCountries;
          else {
            filterCountries = filterCountries.filter((country) =>
              country.Activities.some((act) => act.name === activity)
            );
          }
          if (order === "") filterCountries;
          if (order === "asc") {
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
          } else if (order === "desc") {
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
          } else if (order === "lowerPop") {
            filterCountries.sort((a, b) => a.population - b.population);
          } else if (order === "higherPop") {
            filterCountries.sort((a, b) => b.population - a.population);
          }
        }

        return dispatch({ type: COMBINED_FILTERS, payload: filterCountries });
      })
      .catch((error) => console.log(error.message));
  };
};
