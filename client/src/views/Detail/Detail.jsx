import axios from "axios";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import style from "./Detail.module.css"; // Importamos el módulo CSS específico para este componente

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/countries/${id}`).then(({ data }) => {
      if (data.id) {
        setCountry(data);
      } else {
        window.alert("Can't find the detail of that country");
      }
    });
    return setCountry({});
  }, [id]);
  
  return (
    <div className={style.detailContainer}>
      <h2 className={style.detailHeading}>Country Details</h2>
      <img src={country.flags} alt={country.name} className={style.detailImage} />
      <div className={style.detailItem}>
        <span className={style.detailLabel}>ID:</span>
        <span className={style.detailValue}>{id}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Name:</span>
        <span className={style.detailValue}>{country.name}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Continent:</span>
        <span className={style.detailValue}>{country.continent}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Capital:</span>
        <span className={style.detailValue}>{country.capital}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Subregion:</span>
        <span className={style.detailValue}>{country?.subregion}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Area:</span>
        <span className={style.detailValue}>{country?.area}</span>
      </div>
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Population:</span>
        <span className={style.detailValue}>{country.population}</span>
      </div>
      <div>
        <span>Activities: </span>
       {country.Activities?.map((activity) => {
          return (
            
            <>
            <span>Name: {activity.name}</span>
            <span>Dificulty: {activity.difficulty}</span>
            <span>Season: {activity.season}</span>
            <span>Duration: {activity.duration}</span>
          </>
          )
         
       }) }
      </div>
    </div>
  );
};

export default Detail;
