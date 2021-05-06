document.addEventListener("DOMContentLoaded", () => {
  let pageNum = 1
  const forward = document.getElementById('forward')
  const backward = document.getElementById('back')
  const monsterContainer = document.getElementById('monster-container')
  const formContainter = document.getElementById('create-monster')
  const button = showForm()
  fetchMonsters()

  button.addEventListener('click', (e) => {
    e.preventDefault()
    const newName = document.getElementById('name').value
    const newAge = document.getElementById('age').value
    const newBio = document.getElementById('description').value
    if (validMonster(newName, newAge, newBio)){createMonster(newName, newAge, newBio)}
  });

  forward.addEventListener('click', () => {
    pageNum++
    monsterContainer.innerHTML = ""
    fetchMonsters()
  });

  backward.addEventListener('click', () => {
    if (pageNum - 1 > 0){
      pageNum--
      monsterContainer.innerHTML = ""
      fetchMonsters()
    } else {
      alert("Aint no monsters here");
    }
  });

  function fetchMonsters(){
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`).then(function(response){
      return response.json();
    }).then(function(json){
      for (const monster of json){
        makeCard(monster)
      }
    })
  };

  function createMonster(newName, newAge, newBio){
    let newMonster = {
      "name": newName,
      "age": newAge, 
      "description": newBio
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newMonster)
    };
    fetch("http://localhost:3000/monsters", configObj)
    .then(function(response) {
      return response.json();
    }).then(function(object) {
      makeCard(object);
    }); 

  
  };

  function makeCard(monster){
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('h4')
    const bio = document.createElement('p')

    name.innerHTML = monster["name"]
    age.innerHTML = `Age: ${monster["age"]}`
    bio.innerHTML = `Bio: ${monster["description"]}`

    card.appendChild(name)
    card.appendChild(age)
    card.appendChild(bio)

    monsterContainer.appendChild(card)
  };

  function showForm(){
    const form = document.createElement('form')

    const name = document.createElement('input')
    name.setAttribute('id', 'name')
    name.setAttribute('placeholder', 'name...')

    const age = document.createElement('input')
    age.setAttribute('id', 'age')
    age.setAttribute('placeholder', 'age...')

    const description = document.createElement('input')
    description.setAttribute('id', 'description')
    description.setAttribute('placeholder', 'description...')

    const button = document.createElement('button')
    button.innerHTML = 'Create'

    form.appendChild(name)
    form.appendChild(age)
    form.appendChild(description)
    form.appendChild(button)

    formContainter.appendChild(form)

    return button
  };

  function validMonster(name, age, bio){
    switch (true){
      case ([name, age, bio].includes('')):
        console.log("Missing Monster Attribute")
        return false;
      case (parseFloat(age).toString() !== age):
        console.log("Age must be a number")
        return false;
      default:
        return true;
    }
  };


});