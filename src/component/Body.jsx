import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Country from "./Country";
import Option from "./Option";
import ThemeContext from "./ThemeContext";
import data from "../data/countries.json";


export default function Countries() {
  const [countryData, setCountryData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const { mode } = useContext(ThemeContext);

      const criteria=['Area','Population'];
      const order=['Ascending','Descending']; 

  useEffect(() => {
    const fetchData = () => {
      try {
        setTimeout(() => {
          setCountryData(data);
          const uniqueRegions = [...new Set(data.map((item) => item.region))];
          setRegions(uniqueRegions);

          setSubregions([...new Set(data.map((item) => item.subregion))]);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRegionChange = (e) => {
    const pickedRegion = e.target.value;
    setSelectedRegion(pickedRegion);

    if (pickedRegion) {
      const uniqueSubRegions = [
        ...new Set(
          countryData
            .filter((item) => item.region === pickedRegion)
            .map((item) => item.subregion)
            .filter(Boolean)
        ),
      ];
      setSubregions(uniqueSubRegions);
      setSelectedSubRegion("");
    } else {
      const allSubRegions = [
        ...new Set(data.map((item) => item.subregion).filter(Boolean)),
      ];
      setSubregions(allSubRegions);
      setSelectedSubRegion("");
    }
  };

  const handleSubRegionChange = (e) => {
    setSelectedSubRegion(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const getFilteredData = () => {
    let filtered = countryData;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    if (selectedSubRegion) {
      filtered = filtered.filter(
        (item) => item.subregion === selectedSubRegion
      );
    }

    if (sortCriteria && sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortCriteria === "Population") {
          return sortOrder === "Ascending"
            ? a.population - b.population
            : b.population - a.population;
        } else if (sortCriteria === "Area") {
          return sortOrder === "Ascending" ? a.area - b.area : b.area - a.area;
        }
      });
    }

    return filtered;
  };

  const filteredData = getFilteredData();
          
  return (
    <div className={`${mode ? "dark" : "light"} body`}>
      <div className="find">
        <div className="search-bar-container">
          <input
            className="find-countries search-bar"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a Country"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="filter">
          <Option
            value={selectedRegion}
            handleFunc={handleRegionChange}
            onBasis={regions}
            filterBy="Filter By Region"
          />

          <Option
            value={selectedSubRegion}
            handleFunc={handleSubRegionChange}
            onBasis={subregions}
            filterBy="Filter By Sub Region"
          />

          <Option
              onBasis={criteria} 
            value={sortCriteria}
            filterBy="Sort Criteria"
            handleFunc={handleSortCriteriaChange}
          />

          <Option value={sortOrder}  onBasis={order}  filterBy="Order By" handleFunc={handleSortOrderChange} />
        </div>
      </div>
      <div className="country-boxes">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link to={`/countries/${item.name.common}`} key={item.ccn3}>
              <Country
                flag={item.flags.png}
                name={item.name.common}
                population={item.population}
                region={item.region}
                capital={item.capital ? item.capital[0] : "N/A"}
                area={item.area}
              />
            </Link>
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
}
