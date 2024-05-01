import { useState, useEffect } from "react";

//Car Component
export default function Car({ year, make, model, id, token }) {
  //State Variables
  const [btn, setBtn] = useState("+");
  const [selectedCar, setSelectedCar] = useState({});
  console.log("Token in Car.jsx:" + token)
  //Changes btn into a - when clicked & fetches the car's data using it's id
  //NOT FUNCTIONAL: Currently not able to get authorization to work. Will likely throw a 403 error.
  const handleBtnPress = () => {
    setBtn(btn === "+" ? "-" : "+");

    fetch(`/cars/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setSelectedCar(data);

      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
      });
  };

  useEffect(() => {
    console.log(selectedCar);
  }, [selectedCar]);

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
