import { searchCountry, getCountries } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from "./SearchBar.module.css";

const SearchBar = ({ searchValue, onSearchChange }) => {
  const dispatch = useDispatch();

  useEffect(() => {
      if (searchValue.length) {
          dispatch(searchCountry(searchValue));
      } else {
          dispatch(getCountries());
      }
  }, [searchValue]);

  return (
    <div className={style.SearchBar}>
      <input
        className={style.inputSearch}
        type="search"
        value={searchValue}
        onChange={onSearchChange}
        name="search-name"
        placeholder="Insert a country name..."
      />
    </div>
  );
}

export default SearchBar;