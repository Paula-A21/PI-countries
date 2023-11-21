import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  SET_ORDER,
  SET_FILTER_CONTINENT,
  SET_FILTER_ACTIVITY,
  COMBINED_FILTERS,
  SEARCH_COUNTRY, 
  CLEAR_FILTERS
} from "./action-types";

const initialState = {
  countries: [],
  activities: [],
  allCountries: [],
  order: "",
  filterContinent: "",
  filterActivity: ""
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_FILTERS:
    return {
      ...state,
      order: '',
      filterContinent: '',
      filterActivity: '',
      countries: state.allCountries, 
    };

    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        countries: payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
      case SEARCH_COUNTRY:
        return {
          ...state,
          countries: payload,
        };
        
    case SET_ORDER:
      return {
        ...state,
        order: payload,
      };

    case SET_FILTER_CONTINENT:
      return {
        ...state,
        filterContinent: payload,
      };

    case SET_FILTER_ACTIVITY:
      return {
        ...state,
        filterActivity: payload,
      };

    case COMBINED_FILTERS:
      return {
        ...state,
        countries: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
