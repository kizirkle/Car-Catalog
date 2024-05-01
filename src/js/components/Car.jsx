import { useState, useEffect } from "react";

//Car Component
export default function Car({ year, make, model, id, token }) {
  //State Variables
  const [btn, setBtn] = useState("+");
  const [selectedCar, setSelectedCar] = useState({});


  

  const handleBtnPress = () => {
    //Changes btn into a - when clicked & fetches the car's data using it's id
    setBtn(btn === "+" ? "-" : "+");

    // Check if the response is in the cache
    caches.match(`/cars/${id}`).then((response) => {
    if (response) {
      // If it's in the cache, use the cached response
      response.json().then((data) => setSelectedCar(data));
    } else {
      // If it's not in the cache, make a fetch request
      fetch(`/api/cars/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Only cache successful responses
        if (res.ok) {
          // Clone the response before reading the body
          const clone = res.clone();
      
          // Add the cloned response to the cache
          caches.open('car-cache').then((cache) => {
            cache.put(`/cars/${id}`, clone);
          });
        }
      
        // Now you can read the body
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSelectedCar(data);
      });
    }
  });
  };

  //useEffect(() => {
    //console.log(selectedCar);
  //}, [selectedCar]);

  return (
    <div className="card m-2" style={{ width: "70vw" }}>
      <div className="card-body row">
        <h5 className="card-title col">
          {year} {make} {model}
        </h5>
        {/* BootStrap Styling Accordion: Uses #collapse${id} to control view of data */}
        <button
          className="btn btn-dark col-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded="false"
          aria-controls={`collapse${id}`}
          onClick={handleBtnPress}
        >
          {btn}
        </button>
      </div>
      {/* BootStrap Styling Accordion: The corresponding #collapse${id}*/}
      <div
        id={`collapse${id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        {/* This is unlikely to be functional. Again, I was unable to test, as I was repeatedly getting 403 errors. */}
        <div className="accordion-body row">
        {selectedCar && selectedCar.car && (
    <>
      <img className="col-4 m-4" src={selectedCar.car.image} />
      <div className="col-4 m-4">
        <h5>Price: {selectedCar.car.price}</h5>
        <h5>MPG: {selectedCar.car.mpg}</h5>
        <h5>Seats: {selectedCar.car.seats}</h5>
      </div>
    </>
  )}
        </div>
      </div>
    </div>
  );
}
