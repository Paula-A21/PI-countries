import React from "react";
import style from "./Landing.module.css";
import {Link} from 'react-router-dom';

function Landing () {

    return(
        <div className={style.background}>
            <h1 className={style.h1}>Welcome to the World!</h1>
            <Link to="/home">
                <button>
                    Let's travel together!
                </button>
            </Link> 
        </div>
    );
}

export default Landing;