
import validations from "./validations";

import axios from "axios";
import { getCountries } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
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

  const changeHandler = (event) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validations({
        ...activity,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleCountrySearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery)
    );
    setActivity({
      ...activity,
      countrySearch: event.target.value,
      searchResults: filteredCountries,
    });
  };

  const handleAddCountry = (country) => {
    // Verificar si el país ya está en la lista
    if (!activity.countries.includes(country.name)) {
      setActivity((prevData) => ({
        ...prevData,
        countrySearch: "",
        searchResults: [],
        countries: [...prevData.countries, country.name], // Guarda solo el nombre del país
      }));
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
    axios
      .post("http://localhost:3001/activities/form", activity)
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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <h2>CREATE ACTIVITY FOR YOUR COUNTRIES</h2>
        </div>

        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={changeHandler}
          />
          <label>*</label>
        </div>
        <div>
          <label>Difficulty: </label>
          <input
            type="number"
            name="difficulty"
            value={activity.difficulty}
            onChange={changeHandler}
          />
          <label>*</label>
        </div>

        <div>
          <label>Duration: </label>
          <input
            type="time"
            name="duration"
            value={activity.duration}
            onChange={changeHandler}
          />
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
          <label>*</label>
        </div>

        <div>
          <label>Countries: </label>
          <div>
            <input
              type="text"
              name="countries"
              value={activity.countrySearch}
              onChange={handleCountrySearch}
              placeholder="Search countries..."
            />
            <label>*</label>
            <div>
              {activity.searchResults.map((country) => (
                <div
                  key={country.name}
                  onClick={() => handleAddCountry(country)}
                >
                  {country.name}
                  {activity.countries.includes(country.name) && (
                    <span>Added</span>
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
                  ❌{console.log(activity)}
                </button>
              </div>
            ))}
          </div>
          {activity.name &&
            activity.difficulty &&
            activity.season &&
            activity.countries.length > 0 &&
          Object.keys(errors).length === 0 ? (
            <button>CREATE ACTIVITY</button>
          ) : (
            <button disabled>Some fields are missing</button>
          )}
          {console.log(errors)}
        </div>
      </div>
    </form>
  );
};

export default Form;



// import validations from "./validations";

// import axios from "axios";
// import { getCountries } from "../../redux/actions";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Form = () => {
//   const dispatch = useDispatch();
//   const countries = useSelector((state) => state.countries);
//   const navigate = useNavigate();
  
//   const [activity, setActivity] = useState({
//     name: "",
//     difficulty: "",
//     duration: "",
//     season: "",
//     countries: [],
//     countrySearch: "",
//     searchResults: [],
//   });
//   const [errors, setErrors] = useState({});
//   // const [errors, setErrors] = useState({
//   //   name: "",
//   //   difficulty: "",
//   //   duration: "",
//   //   season: "",
//   //   countries: []
//   // });

//   useEffect(() => {
//     dispatch(getCountries());
//   }, [dispatch]);

//   const changeHandler = (event) => {
//     const property = event.target.name;
//     const value = event.target.value;

//     validations(
//       {
//         ...activity,
//         [property]: value,
//       },
//       setErrors,
//       errors,
//       property
//     );
//     setErrors(
//       validations({
//         ...activity,
//         [event.target.name]: event.target.value,
//       })
//     );
//     // setActivity({
//     //   ...activity,
//     //   [property]: value,
//     // });
//   };

//   const handleCountrySearch = (event) => {
//     const searchQuery = event.target.value.toLowerCase();
//     const filteredCountries = countries.filter((country) =>
//       country.name.toLowerCase().includes(searchQuery)
//     );
//     setActivity({
//       ...activity,
//       countrySearch: event.target.value,
//       searchResults: filteredCountries,
//     });
//   };

//   const handleAddCountry = (country) => {
//     // Verificar si el país ya está en la lista
//     if (!activity.countries.includes(country.name)) {
//       setActivity((prevData) => ({
//         ...prevData,
//         countrySearch: "",
//         searchResults: [],
//         countries: [...prevData.countries, country.name], // Guarda solo el nombre del país
//       }));
//     }
//   };

//   const handleRemoveCountry = (country) => {
//     setActivity((prevData) => ({
//       ...prevData,
//       countries: prevData.countries.filter((c) => c !== country),
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:3001/activities/form", activity)
//       .then((res) => {
//         console.log("Response from server:", res.data);
//         alert("Activity created successfully!");
//         navigate("/home");
//       })
//       .catch((error) => {
//         console.error("Error creating activity:", error);
//         if (error.response) {
//           console.error("Error response from server:", error.response.data);
//         }
//         alert("Error creating activity. Please try again.");
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} >
//       <div>
//         <div>
//           <h2>CREATE ACTIVITY FOR YOUR COUNTRIES</h2>
//         </div>

//         <div>
//           <label>Name: </label>
//           <input
//             type="text"
//             name="name"
//             value={activity.name}
//             onChange={changeHandler}
//           />
//           <label>*</label>
//           {/* {console.log(errors.name)}
//           <span>{errors.name}</span> */}
//         </div>
//         <div>
//           <label>Difficulty: </label>
//           <input
//             type="number"
//             name="difficulty"
//             value={activity.difficulty}
//             onChange={changeHandler}
//           />
//           <label>*</label>
//           {/* {console.log(errors.difficulty)}
//           <span>{errors.difficulty}</span> */}
//         </div>

//         <div>
//           <label>Duration: </label>
//           <input
//             type="time"
//             name="duration"
//             value={activity.duration}
//             onChange={changeHandler}
//           />
//           {/* {console.log(errors.duration)}
//           <span>{errors.duration}</span> */}
//         </div>
//         <div>
//           <label>Season: </label>
//           <select
//             name="season"
//             value={activity.season}
//             onChange={changeHandler}
//           >
//             <option value="" disabled>
//               Select a season
//             </option>
//             <option value="Summer">Summer</option>
//             <option value="Autumn">Autumn</option>
//             <option value="Winter">Winter</option>
//             <option value="Spring">Spring</option>
//           </select>
//           <label>*</label>
//           {/* {console.log(errors.season)}
//           <span>{errors.season}</span> */}
//         </div>

//         <div>
//           <label>Countries: </label>
//           <div>
//             <input
//               type="text"
//               name="countries"
//               value={activity.countrySearch}
//               onChange={handleCountrySearch}
//               placeholder="Search countries..."
//             />
//             {/* {console.log(errors.countries)}
//             <span>{errors.countries}</span> */}
//             <label>*</label>
//             <div>
//               {activity.searchResults.map((country) => (
//                 <div
//                   key={country.name}
//                   onClick={() => handleAddCountry(country)}
//                 >
//                   {country.name}
//                   {activity.countries.includes(country.name) && (
//                     <span>Added</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             {activity.countries.map((country) => (
//               <div key={country}>
//                 <span>{country}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveCountry(country)}
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>
//           {Object.keys(errors).length === 0 ? (
//             <button>CREATE ACTIVITY</button>
//           ) : (
//             <button disabled>Some fields are missing</button>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Form;