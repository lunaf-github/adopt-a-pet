import React, {useState}  from 'react';
import {useQuery} from '@tanstack/react-query';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
import Results from './Results';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: ""
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className='search-params'>
      <form onSubmit={submitForm}>
        <label htmlFor='location'>
          Location
          <input 
            id="location" 
            placeholder="location" 
            name = "location"
          />
        </label>

        <label htmlFor='animal'>
          Animal
          <select 
            id="animal"
            name = "animal"
            onChange={updateAnimal}
          >
            <option />
            {ANIMALS.map(generateOption)}
          </select>
        </label>
        
        <label htmlFor='bread'>
          Breed
          <select 
            id="breed"
            disabled ={noOptions(breeds)} 
            name="breed"
          >
            <option />
            {breeds.map(generateOption)}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />

    </div>
  );

  // ***************************************

  function updateAnimal(e) {
     setAnimal(e.target.value);
  }
  
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? ""
    }
    setRequestParams(obj);
  }

  function generateOption(option) {
     return <option key={option}>{option}</option>;
  }

  function noOptions(breeds) {
     return breeds.length === 0
  }

}

export default SearchParams;