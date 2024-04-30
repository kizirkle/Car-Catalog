import { useState, useEffect } from 'react';
import Car from './components/Car'
import Filter from './components/Filter'

const Fetch = () => {
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    fetch('https://exam.razoyo.com/api/cars')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCars(data.cars);
        setMakes(data.makes);
      });
  }, []);

  return (
    <div>
        <Filter />
      {cars.map((car) => (
        <Car key={car.id} year={car.year} make={car.make} model={car.model} />
      ))}
    </div>
  );
};
export default Fetch;