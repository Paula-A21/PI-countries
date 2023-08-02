import Paginated from "../../components/Paginated/Paginated";
import {
  getCountries,
  getActivities,
  setOrder,
  setFilterContinent,
  setFilterActivity,
  combinedFilters,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import style from "./Home.module.css"



const Home = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const filterContinent = useSelector((state) => state.filterContinent);
  const filterActivity = useSelector((state) => state.filterActivity);
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if (order || filterContinent || filterActivity)
      dispatch(combinedFilters(order, filterContinent, filterActivity));
    else dispatch(getCountries());
  }, [order, filterContinent, filterActivity]);

  const orderedCountriesHandler = (event) => {
    dispatch(setOrder(event.target.value));
    setCurrentPage(1);
  };

  const filteredContinentHandler = (event) => {
    dispatch(setFilterContinent(event.target.value));
    setCurrentPage(1);
  };

  const filteredActivityHandler = (event) => {
    dispatch(setFilterActivity(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
          <small className={style.small}>Order by: </small>
        <select onChange={(event) => orderedCountriesHandler(event)} className={style.select}>
          <option value="">None</option>
          <option value="asc">Ascending Name</option>
          <option value="desc">Descending Name</option>
          <option value="higherPop">Higher Population</option>
          <option value="lowerPop">Lower Population</option>
        </select>

        <small className={style.small}>Filter by continent: </small>
        <select onChange={(event) => filteredContinentHandler(event)} className={style.select}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>

        <small className={style.small}>Filter by activity type: </small>
        <select onChange={(event) => filteredActivityHandler(event)} className={style.select}>
          <option value="">None</option>
          {activities?.map((activity) => (
            <option value={activity.name} key={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      {currentCountries.length > 0 ? ( // Verificar si hay países para mostrar
        <Cards currentCountries={currentCountries} />
      ) : (
        <p>
          No countries were found with the specified filters or search terms.
        </p>
      )}
      <Paginated
        countriesPerPage={countriesPerPage}
        countries={countries.length}
        paginated={paginated}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;