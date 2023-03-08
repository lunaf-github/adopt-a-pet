import React, {useState, useEffect}  from 'react';
import Pet from './Pet';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestPets();
  },[]);

  async function requestPets() {
    const res = await fetch(
     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    setPets(json.pets)
  }

  return (
    <div className='search-params'>
      <form onSubmit={submitForm}>
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

      {pets.map(generatePets)}
    </div>
  );

  // ***************************************

  function updateLocation(e) {
     setLocation(e.target.value);
  }

  function updateAnimal(e) {
     setAnimal(e.target.value);
     setBreed("");
  }

  function updateBreed(e) {
     setBreed(e.target.value);
  }
  
  function submitForm(e) {
    e.preventDefault();
    requestPets();
  }

  function generateOption(option) {
     return <option key={option}>{option}</option>;
  }

  function generatePets(pet) {
     return <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
  }

  function noOptions(breeds) {
     return breeds.length === 0
  }

}

export default SearchParams;