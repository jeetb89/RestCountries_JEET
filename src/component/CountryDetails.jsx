import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThemeContext from "./ThemeContext";

export default function CountryDetails() {
  const { id } = useParams();
  const url = `https://restcountries.com/v3.1/name/${id}?fullText=true`;

  const [countryData, setCountryData] = useState(null);
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext); // Use the theme context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const data = await result.json();
        if (data.length > 0) {
          setCountryData(data[0]);
        } else {
          console.log("No country data found");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className={`country-details ${mode ? "dark" : "light"}`}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>
      {countryData ? (
        <div className="content-container">
          <div className="country-flag">
            {countryData.flags && countryData.flags.png ? (
              <img className='flag' src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
            ) : (
              <p>Loading flag...</p>
            )}
          </div>

          <div className="country-info">
            <div className="name">{countryData.name.common}</div>

            <div className="country-data">
              <div className="native">
                <p>
                  <strong>Native Name:</strong>{" "}
                  {countryData.name.nativeName ? (
                    Object.values(countryData.name.nativeName).map((name, index) => (
                      <span key={index}>{name.common}</span>
                    ))
                  ) : (
                    "N/A"
                  )}
                </p>
                <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {countryData.region}</p>
                <p><strong>Subregion:</strong> {countryData.subregion}</p>
                <p>
                  <strong>Capital:</strong>{" "}
                  {countryData.capital ? countryData.capital.join(", ") : "N/A"}
                </p>
              </div>
              <div className="domain">
                <p>
                  <strong>Top Level Domain:</strong>{" "}
                  {countryData.tld ? countryData.tld.join(", ") : "N/A"}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {countryData.languages ? (
                    Object.values(countryData.languages).join(", ")
                  ) : (
                    "N/A"
                  )}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {countryData.currencies ? (
                    Object.values(countryData.currencies).map((currency, index) => (
                      <span key={index}>{currency.name}</span>
                    ))
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
            <p className="border">
              <strong>Border Countries:</strong>{" "}
              {countryData.borders ? (
                countryData.borders.map((border) => (
                  <button className="border-btn" key={border}>{border}</button>
                ))
              ) : (
                "None"
              )}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading country data...</p>
      )}
    </div>
  );
}
