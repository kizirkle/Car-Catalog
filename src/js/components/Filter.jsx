import { useState } from 'react'

export default function Filter({ cars, setFilter }) {
  const [input, setInput] = useState('')

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      setFilter(input);
    }
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

    </div>
  )
}