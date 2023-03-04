
const Pet = (props) => {
  const DogDescription = [
    React.createElement('h2', {}, props.name),
    React.createElement('h2', {}, props.animal),
    React.createElement('h2', {}, props.breed)
  ]
  return React.createElement('div',{} , DogDescription)
}

const App = () => {
  const TitleCoponent = React.createElement('h1', {}, 'Adopt Me!');
  return React.createElement('div', {}, [
      TitleCoponent,
      React.createElement(Pet, {
        animal: "Dog", 
        breed: "Havanese",
        name: "Luna" 
      }),
      React.createElement(Pet, {
       animal: "Bird", 
       breed: "Cockatiel",
       name: "Pepper" 
      }),
      React.createElement(Pet, {
       animal: "Cat", 
       breed: "Mixed",
       name: "Doink" 
      })
    ]
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));