import {Link} from 'react-router-dom';
import React from "react";
import style from "./Navbar.module.css";
import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch } from 'react-redux';

const NavBar = () => {
    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch();
  
    const handleHomePageClick = () => {
      setSearchName('');
      dispatch(clearFilters()); // Despacha la acción para limpiar filtros
      dispatch(getCountries()); // Despacha la acción para obtener países nuevamente
    };

    const handleInputChange = (event) => { 
        setSearchName(event.target.value.trim());
    };

    return(
        <div className={style.NavBar}>
            <div>
                <SearchBar 
                    className={style.SearchBar} 
                    searchValue={searchName} 
                    onSearchChange={handleInputChange} 
                />
            </div>
            <div className={style.buttonsContainer}>
                <Link to="/home" onClick={handleHomePageClick}>
                    <button>Home Page</button>
                </Link>
                <Link to={`/activities/form`}>
                    <button>Create Activity</button>
                </Link>
                <Link to="/">
                    <button>Landing</button>
                </Link>
            </div>
        </div>
    )
};

export default NavBar;





