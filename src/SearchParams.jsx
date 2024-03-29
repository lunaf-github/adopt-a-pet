import React, { useState, useContext, useDeferredValue, useMemo, useTransition }  from 'react';
import {useQuery} from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
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
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />, 
    [deferredPets]
  );

  return (
    <div className='search-params'>
      <form onSubmit={submitForm}>
        {
          adoptedPet? (
            <div className='pet image-container'>
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null
        }
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
        {
          isPending? (
            <div className='mini loading-pane'>
               <h2 className='loader'>H</h2>
            </div>
          )
        }

        <button>Submit</button>
      </form>
      {renderedPets}

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
    startTransition(() => {
      setRequestParams(obj);
    });
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