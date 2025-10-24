import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => { 

    const [car, setCar] = useState({id: 0, name: "", color: "", price: "", wheels: "", interior: "", convertible: ""})

    useEffect(() => {
        setCar({id: props.id, name: props.name, color: props.color, price: props.price, wheels: props.wheels, interior: props.interior, convertible: props.convertible});
    }, [props]);

    return (
        <div className="card">
            <div className='top-container' style={{ backgroundImage:`url(${car.image})`}}></div>
            <Link to={'/edit/' + car.id}></Link>
            <div className='bottom-container'>
                <h3>{car.name}</h3>
                <p>{'Price: ' + car.price}</p>
                <p>{'Wheels: ' + car.wheels}</p>
                <p>{'Interior: ' + car.interior}</p>
                <p>{'Convertible: ' + (car.convertible ? 'Yes' : 'No')}</p>
                <Link to={'/cars/' + car.id}><a>Read More →</a></Link>
            </div>
        </div>
    )
}

export default Card