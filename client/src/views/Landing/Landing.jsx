import React from "react";
import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../redux/actions';

function Landing() {
  const dispatch = useDispatch();

  const handleTravelTogetherClick = () => {
    dispatch(clearFilters());
  };

  return (
    <div className={style.background}>
      <h1 className={style.h1}>Welcome to the World!</h1>
      <Link to="/home" onClick={handleTravelTogetherClick}>
        <button className={style.button}>Let's travel together!</button>
      </Link>
    </div>
  );
}

export default Landing;