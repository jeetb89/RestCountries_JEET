import React from 'react';

export default function Option({ value, handleFunc, filterBy, onBasis }) {

    return (
    <select className="find-countries region" value={value} onChange={handleFunc} id="findcounties">
      <option value="">{filterBy}</option>
      {onBasis.map((basis, index) => (
        <option key={index} value={basis}>
          {basis}
        </option>
      ))}
    </select>
  );
}
