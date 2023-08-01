import React from "react";
import {Link} from 'react-router-dom';


function Card( country ) {
  const {id, name, flags, continent} = country;

  return (
    <div>
        <h2>{name}</h2> 
        <img src={flags} alt={name}/>
        <h2>{continent}</h2>
        <Link to={`/detail/${id}`}>
          <button>➕</button>
        </Link>
    </div>
  );
}

export default Card; 





