export default function Car({year, make, model}) {
//Add State To Make a + or a -

    return(
        <div className="card" style={{width: '70vw'}}>
            <div className="card-body row">
                <h5 className="card-title col">
                    {year} {make} {model}</h5>
                <a href="#" className="btn btn-dark col-1">+</a>
            </div>
        </div>
    )
}