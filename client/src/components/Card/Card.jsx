import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";


function Card(country) {
  const { id, name, flags, continent } = country;

  return (
    <div className={style.container}>
      <img className={style.cardImage} src={flags} alt={name} />
      <h2 className={style.title}>{name}</h2>
      <h2>{continent}</h2>
      <Link to={`/detail/${id}`}>
        <button>➕</button>
      </Link>
    </div>
  );
}

export default Card;
