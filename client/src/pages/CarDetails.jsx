import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'

const CarDetails = ({data}) => {

    const { id } = useParams()

    const [car, setCar] = useState({id: 0, name: "", price: "", wheels: "", interior: "", exterior: "", convertible: "", roof: ""})


    useEffect(() => {
        const fetchCarById = async () => {
            let response = await fetch(`/cars/${id}`)
            let data = await response.json()
            setCar(data)
        }
        fetchCarById()
    }, [data, id]);


    return (
        <div className="CarDetails">
            <main id="car-content" class="car-info">
                <div class="image-container">
                    <img id="image" src={car.image} />
                </div>
                <div class="car-details">
                    <h2 id="name">{car.name}</h2>
                    <p id="wheels">{'Wheels: ' + car.wheels}</p>
                    <p id="price">{'Price: ' + car.price}</p>
                    <p id="interior">{'Interior: ' + car.interior}</p>
                    <p id="color">{'Color: ' + car.color}</p>
                    <p id="convertible">{'Convertible: ' + car.convertible}</p>
                </div>
            </main>
        </div>
    )
}

export default CarDetails