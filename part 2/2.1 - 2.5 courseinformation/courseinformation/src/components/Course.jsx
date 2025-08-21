const Course = ({course}) => {
  return (
  <div>
    {course.map(c => {
      const total = c.parts.reduce((sum , part) => sum + part.exercises,0)
      
      return (
        <div key={c.id}>
        <h1>{c.name}</h1>
        <ul>
          {c.parts.map(part => (
            <li key={part.id}>
              {part.name} {part.exercises}
              </li>
          ))}
        </ul>
        <p>Total of {total} exercises</p>
        </div>
      )})}
  </div>
  )}

export default Course