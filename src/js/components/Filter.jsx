import {useState} from 'react'
export default function Filter(make) {
//API call to filter Cars
const [input, setInput] = useState('')

const fetchedData = make

    return(
        <div className="m-4 justify-content-end col row">
                <p className="col-1 align-self-center">Filter By Make:</p>
                <input 
                className="col-2" 
                placeholder="Any" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                />
        </div>
    )
}