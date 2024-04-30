import { useState } from 'react'
import Car from './Car'

export default function Filter({ cars }) {
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('')

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      setFilter(input);
    }
  }

  let filteredData = [];
  if (cars) {
    filteredData = cars.filter(car => car.make.toLowerCase().includes(filter.toLowerCase()));
  }

  return(
    <div className="m-4 justify-content-end col row">
      <p className="col-1 align-self-center">Filter By Make:</p>
      <input 
        className="col-2" 
        placeholder="Any" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyPress={handleKeyPress}
      />

      {/* Display the filtered cars */}
      {filteredData.map((car) => (
        <Car key={car.id} year={car.year} make={car.make} model={car.model} />
      ))}
    </div>
  )
}