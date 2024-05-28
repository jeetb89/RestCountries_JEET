
export default  function Country({flag,name,population,region,capital}){
    
    return( <div className="country">
        <img src={flag}/>
        <div className="card-content">
        <p><strong>{name}</strong></p>
        <div className="innercard-content">
        <p><strong>Population:</strong> {population}</p>
        <p> <strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capital}</p>   
         </div>
        </div>
    </div>);
}