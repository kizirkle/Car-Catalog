import { useState, useEffect } from 'react'
// import '../App.css'

import Header from './components/Header';
import Filter from './components/Filter';
import Car from './components/Car';
import Footer from './components/Footer';



function App() {
  const [cars, setCars] = useState([])
  useEffect(() => {
    fetch('https://exam.razoyo.com/api/cars')
    .then((res) => res.json())
    .then((data) => {
      setCars(data.cars)
    })
  })
  return (
    <div>
      <Header />
      <Filter cars={cars} />
      {/* Map Cars for Each Make and Model Here: */}
      <div className="justify-content-center">
        <p>Hello, World!</p>
        {cars.map((car) => (
        <Car key={car.id} year={car.year} make={car.make} model={car.model} />
      ))}
      </div>
      <Footer />
    </div>
  )
}

export default App
