import { searchCountry, getCountries } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from "./SearchBar.module.css";
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchValue, onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length) {
      dispatch(searchCountry(searchValue));
    } else {
      dispatch(getCountries());
    }
  }, [searchValue]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      navigate('/home');
    }
    onSearchChange(event); // Propagar el evento de cambio
  };

  return (
    <div className={style.SearchBar}>
      <input
        className={style.inputSearch}
        type="search"
        value={searchValue}
        onChange={handleSearchChange}
        name="search-name"
        placeholder="Insert a country name..."
      />
    </div>
  );
}

export default SearchBar;