const PersonList = ({ persons , deletePerson}) => (
  <ul>
    {persons.map((person, i) => {
  if (!person) return null // Skip if undefined
  return (
    <li key={person.id || i}>
      {person.name} {person.number}
      <button type="button" onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </li>
  )
})}
  </ul>
)
export default PersonList