import Card from '../Card/Card';
import React from "react";
import style from "./Cards.module.css";

function Cards({ currentCountries }) { //recibe props desde Paginated

  return (
    <div className={style.cardsContainer}>
      { 
          currentCountries?.map((country)=>{
            return ( /*Por cada card que mapee le paso a la Card */
            
              <Card 
                key={country.id}
                id={country.id}
                name={country.name} 
                flags={country.flags}
                continent={country.continent}
              />
            )
        })
      }
    </div>
  );
}

export default Cards;