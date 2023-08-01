import {Link} from 'react-router-dom';
import React from "react";

const NavBar = () => {
    return(
        <div>
            
             <Link to="/home">
               <button>Home Page</button>
            </Link>
            <Link to={`/activities/form`}>
                <button>Agregar actividad</button>
            </Link>

        </div>
    )
};

export default NavBar;