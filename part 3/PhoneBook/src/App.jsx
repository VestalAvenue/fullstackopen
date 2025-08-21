import { useEffect, useState } from 'react'
import FilterForm from './components/FilterForm.jsx'
import FilteredList from './components/FilteredList.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonList from './components/PersonList.jsx'
import axios from 'axios'
import Notification from './components/Notification.jsx'
import phoneService from './services/phoneServices.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterNumber, setFilterNumber] = useState('')
  const [notificationMessage , setNotificationMessage] = useState ([])
  const [filtered, setFiltered] = useState([])


  const timeout = () =>{
    setTimeout(() => {
      setNotificationMessage(null)
    },5000)
  }

  useEffect(() =>{
    console.log("effect")
    axios
      .get("api/persons")
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  } ,[])
  
  const deletePerson = (id,name) => {
    if(window.confirm(`Delete ${name}?`)){
      phoneService
        .deleteP(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage({message: "deleted" , personName: name})
        })
        .catch((error) => {
          setNotificationMessage({message: "Error" , errorMessage: error.response.data.error })
          timeout()
          setPersons(persons.filter(person => person.id !== id))
        })
        }
    }  


  const addNewEntry = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} already exists. Update number?`)) {
        const updatedPerson = { name: existingPerson.name, number: newNumber }
        phoneService
          .update(existingPerson.id || existingPerson._id, updatedPerson)
          .then(updated => {
            setNotificationMessage({ message: "Updated", personName: updated.name })
            setPersons(persons.map(p => (p.id !== updated.id ? p : updated)))
            setNewName("")
            setNumber("")
            timeout()
          })
          .catch((error) => {
            setNotificationMessage({ message: "Error", errorMessage: error.response.data.error })
            timeout()
          })
      }
      return
}

    
    const newPerson = {name : newName, number : newNumber}
    phoneService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName("")
        setNumber("")
        setNotificationMessage({message :"added", personName : newPerson.name})
        timeout()
      })
      .catch(error => {
        setNotificationMessage({message: "Error", errorMessage: `${error.response.data.error}`})
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const handleFilterNumber = (event) => {
    setFilterNumber(event.target.value)
  }

  const findPerson = (event) => {
    event.preventDefault()

    const filteredList = persons.filter(person =>
      person.name.toLowerCase().includes(filterName.toLowerCase()) &&
      person.number.includes(filterNumber)
    )

    setFiltered(filteredList)
  }

  return (
    <div>
      <h2>Filter</h2>
      <FilterForm
        filterName={filterName}
        filterNumber={filterNumber}
        onNameChange={handleFilter}
        onNumberChange={handleFilterNumber}
        onSubmit={findPerson}
      />

      <FilteredList filtered={filtered} />

      <h2>Phonebook</h2>
      <Notification notification={notificationMessage}/>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handlePersonChange}
        onNumberChange={handleNumberChange}
        onSubmit={addNewEntry}
      />

      <h2>All Numbers</h2>
      <PersonList persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
