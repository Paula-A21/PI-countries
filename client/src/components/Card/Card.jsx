import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Card(country) {
  const { id, name, flags, continent } = country;

  return (
    <div className={`${style.container} country-card`}>
      <img className={style.cardImage} src={flags} alt={name} />
      <div className={style.contentContainer}>
        <h2 className={style.title}>{name}</h2>
        <h3>{continent}</h3>
        <Link to={`/detail/${id}`}>
          <button>➕</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
