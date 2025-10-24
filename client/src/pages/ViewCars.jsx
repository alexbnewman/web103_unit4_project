import React, { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'

const Cars = () => {

    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
          let response = await fetch('/cars')
          let data = await response.json()
          setCars(data)
        }
    
        fetchCars()
    
      }, []);
    
    return (
        <div className="Cars">
            <main>
            {
                cars && cars.length > 0 ?
                cars.map((car,index) => 
                    
                   <Card key={car.id} 
                         name={car.name} 
                         color={car.color} 
                         price={car.price} 
                         wheels={car.wheels} 
                         interior={car.interior} 
                         convertible={car.convertible} />                       

                ) : <h3 className="noResults">{'No Cars Yet 😞'}</h3>
            }
            </main>
        </div>  
    )
}

export default Cars