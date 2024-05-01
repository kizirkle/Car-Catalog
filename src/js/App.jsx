import { useState, useEffect } from "react";

import Header from "./components/Header";
import Filter from "./components/Filter";
import Car from "./components/Car";
import Footer from "./components/Footer";

function App() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("");
  const [token, setToken] = useState("")

    //Fetches raw data from Cars API
    useEffect(() => {
      fetch("/cars")
        .then((res) => {
          // Save the token
          const token = res.headers.get('your-token');
          setToken(token); 

          return res.json();
      })
      .then((data) => {
        setCars(data.cars);
      });
  }, []);

  //Filters cars based on search criteria in the Filter.jsx file.
  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Filter cars={cars} setFilter={setFilter} />
      {/* Map Cars for Each Make and Model Here: */}
      <div className="justify-content-center">
        {filteredCars.map((car) => (
          <Car
            key={car.id}
            token={token}
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
