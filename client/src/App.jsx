import React from 'react'
import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  const [cars, setCars] = useState([]);


  

  let element = useRoutes([
    {
      path: '/',
      element: <ViewCars />
    },
    {
      path:'/new',
      element: <CreateCar title='BOLT BUCKET | Customize Cars' />
    },
    {
      path: '/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App