import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

import ThemeContext from './ThemeContext';

export default function Nav(props) {

  const {mode,setMode} = useContext(ThemeContext);

  return (
    <div className={`${mode?"dark":"light"} title`}>
      <h1>Where in the World?</h1>
      {/* <button></button> */}
      <button className="theme" onClick={()=> setMode(prev => !prev) }><FontAwesomeIcon icon={faMoon} /> Dark Mode</button>
          
    </div>
  );
}
