const PersonForm = ({ 
    newName,
    newNumber,
    onNameChange,
    onNumberChange,
    onSubmit
 }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default PersonForm