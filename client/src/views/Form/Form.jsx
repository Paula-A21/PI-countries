import axios from "axios";
import validations from "./validations";
import { getCountries } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
    countrySearch: "",
    searchResults: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validations(activity));
  }, [activity]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setActivity((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountrySearch = (event) => {
    const countrySearched = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(countrySearched)
    );

    // Exclude countries that are already in the activity
    const availableCountries = filteredCountries.filter(
      (country) => !activity.countries.includes(country.id)
    );

    setActivity({
      ...activity,
      countrySearch: event.target.value,
      searchResults: availableCountries,
    });
  };

  const handleAddCountry = (country) => {
    if (!activity.countries.includes(country.name)) {
      setActivity((prevData) => ({
        ...prevData,
        countrySearch: "",
        searchResults: [],
        countries: [...prevData.countries, country.name],
      }));

      setSelectedCountry(country.name);
    }
  };

  const handleRemoveCountry = (country) => {
    setActivity((prevData) => ({
      ...prevData,
      countries: prevData.countries.filter((c) => c !== country),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convertir el array de nombres de países a un array de IDs de países
    const countriesIdsArray = activity.countries.map((countryName) => {
      const country = countries.find((c) => c.name === countryName);
      return country ? country.id : null;
    });

    const activityData = {
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: countriesIdsArray,
    };

    axios
      .post("http://localhost:3001/activities/form", activityData)
      .then((res) => {
        console.log("Response from server:", res.data);
        alert("Activity created successfully!");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error creating activity:", error);
        if (error.response) {
          console.error("Error response from server:", error.response.data);
        }
        alert("Error creating activity. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div>
        <div className={style.formField}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={changeHandler}
          />
          {errors.name && (
            <span className={style.formError}>{errors.name}</span>
          )}
        </div>
        <div className={style.formField}>
          <label>Difficulty: </label>
          <input
            type="number"
            name="difficulty"
            value={activity.difficulty}
            onChange={changeHandler}
          />
          {errors.difficulty && (
            <span className={style.formError}>{errors.difficulty}</span>
          )}
        </div>

        <div className={style.formField}>
          <label>Duration: </label>
          <input
            type="time"
            name="duration"
            value={activity.duration}
            onChange={changeHandler}
            placeholder="Search countries..."
          />
          {errors.countries && (
            <span className={style.formError}>{errors.countries}</span>
          )}
        </div>
        <div>
          <label>Season: </label>
          <select
            name="season"
            value={activity.season}
            onChange={changeHandler}
          >
            <option value="" disabled>
              Select a season
            </option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
          {errors.season && (
            <span className={style.formError}>{errors.season}</span>
          )}
        </div>

        <div className={style.formField}>
          <label>Countries: </label>
          <div className={style.formCountrySearch}>
            <input
              type="text"
              name="countries"
              value={activity.countrySearch}
              onChange={handleCountrySearch}
              placeholder="Search countries..."
            />
            {errors.countries && (
              <span className={style.formError}>{errors.countries}</span>
            )}
            <div className={style.searchResults}>
              {activity.searchResults.map((country) => (
                <div
                  key={country.name}
                  className={`${style.searchResultItem} ${
                    selectedCountry === country.name ? style.selectedCountry : ""
                  }`}
                  onClick={() => handleAddCountry(country)}
                >
                  {country.name}
                  {activity.countries.includes(country.name) && (
                    <span className={style.addedIndicator}>Added</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            {activity.countries.map((country) => (
              <div key={country}>
                <span>{country}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(country)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          {activity.name &&
          activity.difficulty &&
          activity.season &&
          activity.countries.length > 0 &&
          Object.keys(errors).length === 0 ? (
            <button className={style.formButton}>CREATE ACTIVITY</button>
          ) : (
            <button className={style.formButton} disabled>
              Some fields are missing
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
