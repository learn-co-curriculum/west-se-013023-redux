import './style.css'
import { legacy_createStore as createStore } from 'redux'


const initialState = {
  budget: 100,
  pets: [
    {id: 1, name: "Daisy", species: "dog"},
    {id: 2, name: "Felix", species: "cat"}
  ]
}

function reducer(state=initialState, action) {

  switch (action.type) {
    case "addTenDollars":
      return {
        ...state,
        budget: state.budget += 10
      }
    case "subtractAmount":
      return {
        ...state,
        budget: state.budget -= action.payload
      }
    default:
      return state
  }
}

const store = createStore(reducer) // create the store
console.log("🚀 ~ file: main.js:7 ~ store:", store)
const startState = store.getState() // gets state of store after initializtion
console.log("🚀 ~ file: main.js:13 ~ startState:", startState)


store.subscribe(() => {
  const newState = store.getState()
  const budgetH3 = document.querySelector('#budget')
  budgetH3.textContent = `Budget: ${newState.budget}`
})
  
// dispatch an action to replace the store state
store.dispatch({type: "addTenDollars"})
const nextState = store.getState() // gets state of store after initializtion
console.log("🚀 ~ file: main.js:13 ~ nextState:", nextState)

const addBtn = document.querySelector('#add10')
addBtn.addEventListener('click', () => store.dispatch({type: "addTenDollars"}))

const subBtn = document.querySelector('#subtract')
subBtn.addEventListener('click', () => store.dispatch({type: "subtractAmount", payload: 3}))


// display pets from store
const petsUl = document.querySelector('#pets')
nextState.pets.forEach(pet => {
  const li = document.createElement('li')
  li.textContent = `Name: ${pet.name} | Species: ${pet.species}`
  petsUl.appendChild(li)
})