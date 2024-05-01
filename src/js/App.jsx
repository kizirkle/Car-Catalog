import { useState, useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import Car from "./components/Car";
import Footer from "./components/Footer";

function App() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://exam.razoyo.com/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.cars);
      });
  }, []);

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredCars);
  return (
    <div>
      <Header />
      <Filter cars={cars} setFilter={setFilter} />
      {/* Map Cars for Each Make and Model Here: */}
      <div className="justify-content-center">
        {filteredCars.map((car) => (
          <Car
            key={car.id}
            id={car.id}
            year={car.year}
            make={car.make}
            model={car.model}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
