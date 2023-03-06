import React from 'react';
import {useState}  from 'react';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const breeds = [];

  return (
    <div className='search-params'>
      <form>
        <label htmlFor='location'>
          Location
          <input 
            id="location" 
            placeholder="location" 
            onChange={updateLocation} 
            value={location} 
          />
        </label>

        <label htmlFor='animal'>
          Animal
          <select 
            id="animal"
            value={animal}
            onChange={updateAnimal}
          >
            <option />
            {ANIMALS.map(generateOption)}
          </select>
        </label>
        
        <label htmlFor='bread'>
          Breed
          <select 
            id="bread"
            disabled ={noOptions(breeds)} 
            value={breed}
            onChange={updateBreed}
          >
            <option />
            {breeds.map(generateOption)}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );

  function updateLocation(event) {
     setLocation(event.target.value);
  }

  function updateAnimal(event) {
     setAnimal(event.target.value);
     setBreed("");
  }

  function updateBreed(event) {
     setBreed(event.target.value);
  }

  function generateOption(option) {
     return <option key={option}>{option}</option>;
  }

  function noOptions(breeds) {
     return breeds.length === 0
  }
}

export default SearchParams;