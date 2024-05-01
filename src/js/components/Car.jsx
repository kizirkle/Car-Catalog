import { useState } from "react";

//Car Component
export default function Car({ year, make, model, id }) {
  //State Variables
  const [btn, setBtn] = useState("+");
  const [selectedCar, setSelectedCar] = useState({});

  //Changes btn into a - when clicked & fetches the car's data using it's id
  //NOT FUNCTIONAL: Currently not able to get authorization to work. Will likely throw a 403 error.
  const handleBtnPress = () => {
    setBtn(btn === "+" ? "-" : "+");

    fetch(`https://exam.razoyo.com/api/cars/${id}`, {
      headers: {
        Authorization: `Bearer kizirkle`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSelectedCar(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
      });
  };

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
          <img className="col-4" src={selectedCar.image} />
          <div className="col-4">
            <h5>Price: {selectedCar.price}</h5>
            <h5>MPG:{selectedCar.mpg}</h5>
            <h5>Seats: {selectedCar.seats}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
