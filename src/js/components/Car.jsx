import { useState, useEffect } from "react";

export default function Car({ year, make, model, id }) {
  const [btn, setBtn] = useState("+");
  const [selectedCar, setSelectedCar] = useState({});

  const handleBtnPress = () => {
    setBtn(btn === "+" ? "-" : "+");

    fetch(`https://exam.razoyo.com/api/cars/${id}`, {
      headers: {
        Authorization: `Bearer Your-Token`,
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
      <div
        id={`collapse${id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
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
