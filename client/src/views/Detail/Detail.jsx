import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


const Detail = () => {

  const { id } = useParams();
    const [country, setCountry] = useState ({}); // Estado y funcion que me permite modificar el estado [state, fn()]

    useEffect(() => {
        axios(`http://localhost:3001/countries/${id}`)
        .then(({ data }) => {
           if (data.id) {
              setCountry(data);
           } else {
              window.alert('Cant find the detail of that country');
           }
        });
        return setCountry({});
     }, [id]);  // No olvidarse del ID porque genera un loop donde la API te banea

  return (
    <div>
         <h2>ID: {id}</h2> 
        <h2>Name: {country.name}</h2> 
        <h2>continent: {country.continent}</h2>
        <h2>Capital: {country.capital}</h2>
        <h2>Subregion: {country?.subregion}</h2>
        <h2>Area: {country?.area}</h2>
        <h2>Population: {country.population}</h2>
        <img src={country.flags} alt={country.name}/> 
    </div>
)
}

export default Detail;