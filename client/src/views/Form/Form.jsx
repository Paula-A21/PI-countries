import axios from "axios";
import validations from "./validations";
import { getCountries } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css";
import {VITE_ENDPOINT} from "../../utils/ENDPOINT"

const Form = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate(); //cada vez que creo una actividad me devuelve al form

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

  useEffect(() => {// un use effect para validar los errores, 
    setErrors(validations(activity)); //porque sino quedan desfasados y no perimite crear la actividad
  }, [activity]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setActivity((prevData) => ({ //le paso al estado de las actividades los nuevos valores ingresados 
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountrySearch = (event) => {
    const countrySearched = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(countrySearched)
    );

    // Excluye los países que ya están seleccionados
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
        countrySearch: "", //una vez que voy a agregar la actividad, devuelvo
        searchResults: [], //los estados a su origen
        countries: [...prevData.countries, country.name]
      }));

      setSelectedCountry(country.name); //guardo el estado local con los paises relacionados a la actividad
    }
  };

  const handleRemoveCountry = (country) => {
    setActivity((prevData) => ({
      ...prevData,
      countries: prevData.countries.filter((c) => c !== country),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //esto evita que se recarge la página por el evento submit

    // Convertir el array de nombres de países a un array de IDs de países
    const countriesIdsArray = activity.countries.map((countryName) => {//para pasarle a la BD el id del país y que lo relacione
      const country = countries.find((c) => c.name === countryName); // en la tabla intermedia
      return country ? country.id : null;
    });

    const activityData = { //le paso los datos con los de la actividad
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: countriesIdsArray //con los id de los países para uqe haga la relacion
    };

    axios
      .post(`${VITE_ENDPOINT}/activities/form`, activityData)
      .then((res) => {
        // console.log("Response from server:", res.data);
        const confirmed = window.confirm("Are you sure you want to submit?");
        if(confirmed){
          alert("Activity created successfully!");
          navigate("/home");
        }
  
      })
      .catch((error) => {
        // console.error("Error creating activity:", error.response.data);
    
        alert(`Error creating activity. Please try again.` + error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}> {/*el handle submit es para cuando se crea una actividad*/}
      <div className={style.formContent}>
        <div className={style.formField}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={changeHandler}
          />
          {errors.name && (
            <span className={style.formError2}>{errors.name}</span>
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
            <span className={style.formError2}>{errors.difficulty}</span>
          )}
        </div>

        <div className={style.formField}>
          <label>Schedule: </label>
          <input
            type="time"
            name="duration"
            value={activity.duration}
            onChange={changeHandler}
          />
          {errors.countries && (
            <span className={style.formError}>{errors.duration}</span>
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
              Select a season:
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
              {activity.searchResults.map((country) => ( //mapeo los países para buscarlos y que me vaya mostrando las opciones
                <div
                  key={country.name}
                  className={`${style.searchResultItem} ${
                    selectedCountry === country.name ? style.selectedCountry : ""
                  }`}
                  onClick={() => handleAddCountry(country)}
                >
                  {country.name} {/*me muestra el país seleccionado*/}
                  {activity.countries.includes(country.name) && (
                    <span className={style.addedIndicator}>Added</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={style.countryCointeiner}>
            {activity.countries.map((country) => (
              <div key={country} className={style.countrySelected}>
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
          {activity.name && //solo si se completan todos los campos requeridos 
          activity.difficulty && //se habilita el botón para crear la actividad
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
