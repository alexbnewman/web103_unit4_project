import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const EditCar = () => {

    const { id } = useParams()
    const [car, setCar] = useState({
        id: 0,
        name: '',
        color: '',
        price: '',
        wheels: '',
        interior: '',
        convertible: '',
    })
    useEffect(() => {
        const fetchCarById = async () => {
            const response = await fetch(`/cars/${id}`)
            const data = await response.json()
            setCar(data)
        }

        fetchCarById()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updateCar = (event) => {
        event.preventDefault()
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car),
        }
        fetch(`/cars/${id}`, options)
        window.location = '/'
    }

    const deleteCar = (event) => {
        event.preventDefault()
        const options = {
            method: 'DELETE'
        }
        fetch(`/cars/${id}`, options)
        window.location = '/'
    }

    return (
        <div className='EditCar'>
            <form>
            <label>Name</label> <br />
                <input type='text' id='name' name='name' value={car.name} onChange={handleChange} /><br />
                <br/>

                <label>Roof</label><br />
                <input type='text' id='roof' name='roof' value={car.roof} onChange={handleChange} /><br />
                <br/>

                <label>Price</label><br />
                <input type='text' id='price' name='price' value={car.price} onChange={handleChange} /><br />
                <br/>

                <label>Wheels</label><br />
                <input type='text' id='wheels' name='wheels' value={car.wheels} onChange={handleChange} /><br />
                <br/>

                <label>Exterior</label><br />
                <input type='text' id='exterior' name='exterior' value={car.exterior} onChange={handleChange} /><br />
                <br/>

                <label>Interior</label><br />
                <input type='text' id='interior' name='interior' value={car.interior} onChange={handleChange} /><br />
                <br/>

                <label>Convertible</label><br />
                <input type='text' id='convertible' name='convertible' value={car.convertible} onChange={handleChange} /><br />
                <br/>

                <input className='submitButton' type='submit' value='Submit' onClick={updateCar} />
                <button className='deleteButton' onClick={deleteCar}>Delete</button>
            </form>
        </div>
    )
}

export default EditCar
