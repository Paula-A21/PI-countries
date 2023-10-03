import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});

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

  return (
    <div
      className={style.detailContainer}
      style={{ backgroundImage: `url(${country.flags})` }}
    >
      {/* <h2 className={style.detailHeading}>Country Details</h2>
      <img src={country.flags} alt={country.name} className={style.detailImage} /> */}
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
      <div className={style.detailItem}>
        <span className={style.detailLabel}>Activities: </span>
        {country.Activities?.length > 0 ? (
          country.Activities.map((activity) => (
            <div key={activity.name} className={style.activity}>
              <div className={style.activityColumn}>
                <span className={style.detailLabel}>Name:</span>
                <span className={style.detailValue}>{activity.name}</span>
              </div>
              <div className={style.activityColumn}>
                <span className={style.detailLabel}>Difficulty:</span>
                <span className={style.detailValue}>{activity.difficulty}</span>
              </div>
              <div className={style.activityColumn}>
                <span className={style.detailLabel}>Season:</span>
                <span className={style.detailValue}>{activity.season}</span>
              </div>
              <div className={style.activityColumn}>
                <span className={style.detailLabel}>Duration:</span>
                <span className={style.detailValue}>{activity.duration}</span>
              </div>
            </div>
          ))
        ) : (
          <span>There are no activities related to this country</span>
        )}
      </div>
    </div>
  );
};

export default Detail;
