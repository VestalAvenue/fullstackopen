import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = 0, average = 0, positive = 0
  
  total = good + neutral + bad
  average = (good - bad) / total
  positive = (good / total) * 100


  const Button = (props) => {
    return (
      <button onClick={props.onClick}>{props.text}</button>
    )
  }

  const StatisticLine = (props) => {
  if (total === 0 && props.totaltext === "total") {
    return (
      <tr>
        <td colSpan="2">No feedback given</td>
      </tr>
    )
  } 
  else if (total === 0) {
    return null
  } 
  else {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }
}


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick = { () => setGood(g => g + 1)} text = "good"></Button>
      <Button onClick = {() => setNeutral(g => g + 1)} text = "neutral"></Button>
      <Button onClick = {() => setBad(g => g + 1)} text = "bad"></Button>
      <h2>Statistics</h2>
      <table>
        <tbody>
      <StatisticLine text="good" value={good} totaltext="total"/>
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </tbody>
      </table>
    </div>

  )
}

export default App