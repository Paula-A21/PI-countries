import {Link} from 'react-router-dom';
import React from "react";
import style from "./Navbar.module.css";
import SearchBar from '../../components/SearchBar/SearchBar';

const NavBar = () => {
    return(
        <div className={style.NavBar}>
            <div>
                <SearchBar className={style.SearchBar}/>
            </div>
            <div className={style.buttonsContainer}>
                <Link to="/home">
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