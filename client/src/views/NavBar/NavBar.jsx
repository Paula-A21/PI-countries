import {Link} from 'react-router-dom';
import React from "react";
import style from "./Navbar.module.css";
import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

const NavBar = () => {
    const [searchName, setSearchName] = useState('');

    const handleInputChange = (event) => { 
        setSearchName(event.target.value);
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
                <Link to="/home" onClick={() => setSearchName('')}>
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





