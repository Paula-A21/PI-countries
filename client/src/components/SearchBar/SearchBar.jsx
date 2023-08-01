import { searchCountry, getCountries } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


const SearchBar = () => {

    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    
    useEffect(() => {
        if (searchName.length) {
          dispatch(searchCountry(searchName));
        } else {
          dispatch(getCountries());
        }
      }, [searchName]);
    
    const handleInputChange = (event) => {
        setSearchName(event.target.value);
    };
    
    return(
        <div>
            <input
                type="search"
                value={searchName} 
                onChange={handleInputChange}
                name="search-name"
                placeholder="Insert a country name..."
            />
        </div>
    )
}

export default SearchBar;