import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import data from "../data/countries.json";

export default function CountryDetails() {
  const { id } = useParams();

  const [countryData, setCountryData] = useState(null);
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = () => {
      try {
        setTimeout(() => {
          const result = data.filter((country) => country.name.common === id);
          setCountryData(result[0]);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`country-details ${mode ? "dark" : "light"}`}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>
      {countryData ? (
        <div className="content-container">
          <div className="country-flag">
            <img
              className="flag"
              src={countryData.flags.png}
              alt={`${countryData.name.common} flag`}
            />
          </div>

          <div className="country-info">
            <div className="name">{countryData.name.common}</div>

            <div className="country-data">
              <div className="native">
                <p>
                  <strong>Native Name:</strong>{" "}
                  {Object.values(countryData.name.nativeName).map(
                    (name, index) => (
                      <span key={index}>{name.common} </span>
                    )
                  )}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {countryData.population.toLocaleString()}
                </p>
                <p>
                  <strong>Region:</strong> {countryData.region}
                </p>
                <p>
                  <strong>Subregion:</strong> {countryData.subregion}
                </p>
                <p>
                  <strong>Capital:</strong> {countryData.capital.join(", ")}
                </p>
              </div>
              <div className="domain">
                <p>
                  <strong>Top Level Domain:</strong>{" "}
                  {countryData.tld.join(", ")}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {Object.values(countryData.languages).join(", ")}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {Object.values(countryData.currencies).map(
                    (currency, index) => (
                      <span key={index}>{currency.name}</span>
                    )
                  )}
                </p>
              </div>
            </div>
            <p className="border">
              <strong>Border Countries:</strong>{" "}
              {countryData.borders
                ? countryData.borders.map((border) => {
                    const borderName = data.reduce((acc, curr) => {
                      if (curr.cca3 === border) {
                        acc = curr.name.common;
                      }
                      return acc;
                    }, "");

                    return (
                      <button className="border-btn" key={border}>
                        {borderName}
                      </button>
                    );
                  })
                : "None"}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading country data...</p>
      )}
    </div>
  );
}
