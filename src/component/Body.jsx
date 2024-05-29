import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Country from './Country';
import Option from './Option';
import ThemeContext from "./ThemeContext";
import data from '../data/countries.json'

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCountryData(data);

                const uniqueRegions = [...new Set(data.map(item => item.region).filter(Boolean))];
                setRegions(uniqueRegions);

                setSubregions([...new Set(data.map(item => item.subregion).filter(Boolean))]);
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
        const selectedRegion = e.target.value;
        setSelectedRegion(selectedRegion);

        // Filter subregions based on the selected region
        if (selectedRegion) {
            const uniqueSubRegions = [...new Set(
                countryData.filter(item => item.region === selectedRegion).map(item => item.subregion).filter(Boolean)
            )];
            setSubregions(uniqueSubRegions);
            setSelectedSubRegion(""); // Reset subregion selection
        } else {
            // If no region is selected, show all subregions
            const allSubRegions = [...new Set(data.map(item => item.subregion).filter(Boolean))];
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
            filtered = filtered.filter(item =>
                item.name.common.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedRegion) {
            filtered = filtered.filter(item => item.region === selectedRegion);
        }

        if (selectedSubRegion) {
            filtered = filtered.filter(item => item.subregion === selectedSubRegion);
        }

        if (sortCriteria && sortOrder) {
            filtered = filtered.sort((a, b) => {
                if (sortCriteria === "population") {
                    return sortOrder === "asc" ? a.population - b.population : b.population - a.population;
                } else if (sortCriteria === "area") {
                    return sortOrder === "asc" ? a.area - b.area : b.area - a.area;
                }
                return 0;
            });
        }

        return filtered;
    };

    const filteredData = getFilteredData();

    return (
        <div className={`${mode ? "dark" : "light"} body`}>
            <div className="find">
                <div className="search-bar-container">
                    <input className="find-countries search-bar" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for a Country" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="filter">
                    <select className="find-countries region" value={selectedRegion} onChange={handleRegionChange} id="findcounties">
                        <option value="">Filter By Region</option>
                        {regions.map((region, index) => (
                            <Option key={index} name={region} value={region} />
                        ))}
                    </select>
                    <select className="find-countries region" value={selectedSubRegion} onChange={handleSubRegionChange} id="findcounties">
                        <option value="">Filter By SubRegion</option>
                        {subregions.map((subregion, index) => (
                            <Option key={index} name={subregion} value={subregion} />
                        ))}
                    </select>
                    <select className="find-countries sort-criteria" value={sortCriteria} onChange={handleSortCriteriaChange} id="sortCriteria">
                        <option value="">Sort Criteria</option>
                        <option value="population">Population</option>
                        <option value="area">Area</option>
                    </select>
                    <select className="find-countries sort-order" value={sortOrder} onChange={handleSortOrderChange} id="sortOrder">
                        <option value="">Sort Order</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div className="country-boxes">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
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
