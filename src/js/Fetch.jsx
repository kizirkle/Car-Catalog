import { useState, useEffect } from 'react';
import Car from './components/Car'

const Fetch = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://exam.razoyo.com/api/cars')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCars(data.cars);
      });
  }, []);

  return (
    <div>
      
      {cars.map((car) => (
        <Car key={car.id}/>
      ))}
    </div>
  );
};
export default Fetch;