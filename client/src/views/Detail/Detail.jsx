import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/countries/${id}`);
        const data = response.data;
        if (data.id) {
          setCountry(data);
        } else {
          window.alert("Can't find the detail of that country");
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchData();

    return () => setCountry({});
  }, [id]);

  useEffect(() => {
    setCountry({}); // Limpiar los detalles al iniciar la búsqueda
  }, [id]);

  // // Redirigir al usuario a la página principal al iniciar una búsqueda
  // const handleSearchChange = (event) => {
  //   const searchTerm = event.target.value.trim();
  //   if (searchTerm) {
  //     navigate('/home');
  //   }
  // };

  return (
    <div>
      {/* <h2 className={style.detailHeading}>Country Details</h2>
      <img src={country.flags} alt={country.name} className={style.detailImage} /> */}
      <div  
      className={style.detailContainer}
      style={{ backgroundImage: `url(${country.flags})` }}
      >
  <div className={style.detailItemContainer}>
  <div className={style.detailItem}>
    <label className={style.detailLabel}>ID:</label>
    <span className={style.detailValue}>{id}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Name: </span>
    <span className={style.detailValue}>{country.name}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Continent: </span>
    <span className={style.detailValue}>{country.continent}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Capital: </span>
    <span className={style.detailValue}>{country.capital}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Subregion: </span>
    <span className={style.detailValue}>{country?.subregion}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Area: </span>
    <span className={style.detailValue}>{country?.area}</span>
  </div>
  <div className={style.detailItem}>
    <span className={style.detailLabel}>Population: </span>
    <span className={style.detailValue}>{country.population}</span>
  </div>
</div>
</div>
  <div>
  {country?.Activities?.length === 0 ? (
    <p className={style.noActivitiesMessage}>There are no activities for this country yet. Create yours!</p>
    ) : (
      <div>
          <span className={style.activitiesTitle}>Activities: </span>
          {country?.Activities?.map((activity) => (
            <div key={activity.id} className={style.activityCard}>
              <h3>{activity.name}</h3>
              <p className={style.activityDetails}>Difficulty: {activity.difficulty}</p>
              <p className={style.activityDetails}>Schedule: {activity.duration}</p>
              <p className={style.activityDetails}>Season: {activity.season}</p>
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    );
  };

export default Detail;
