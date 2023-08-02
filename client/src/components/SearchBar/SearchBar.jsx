import { searchCountry, getCountries } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import style from "./SearchBar.module.css";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    
    useEffect(() => {
        if (searchName.length) { //este use effect logra que como está escuchando 
          dispatch(searchCountry(searchName));//los cambios que hay en el search
        } else {                  //me vaya mostrando resultados a medida de que busco un país
          dispatch(getCountries()); 
        }
      }, [searchName]); 
    
    const handleInputChange = (event) => { 
        setSearchName(event.target.value);
    };
    
    return (
      <div className={style.SearchBar}>
        <input
          className={style.inputSearch}
          type="search"
          value={searchName} 
          onChange={handleInputChange}
          name="search-name"
          placeholder="Insert a country name..."
        />
      </div>
    );
}

export default SearchBar;