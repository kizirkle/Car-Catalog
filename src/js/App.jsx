import { useState, useEffect } from 'react'
// import '../App.css'

import Header from './components/Header';
import Filter from './components/Filter';
import Car from './components/Car';
import Footer from './components/Footer';
import Fetch from './Fetch'

function App() {
  // const [count, setCount] = useState(0)
// const fetchUrl = 'https://exam.razoyo.com/api/cars'

  return (
    <>
      <Header />
      <Filter />
      {/* Map Cars for Each Make and Model Here: */}
      <div className="justify-content-center">
        <p>Hello, World!</p>
        <Fetch />
      </div>
      <Footer />
    </>
  )
}

export default App
