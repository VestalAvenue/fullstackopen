const FilterForm = ({
  filterName,
  filterNumber,
  onNameChange,
  onNumberChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <div>
      Name filter: <input value={filterName} onChange={onNameChange} />
    </div>
    <div>
      Number filter: <input value={filterNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">Find</button>
    </div>
  </form>
)

export default FilterForm