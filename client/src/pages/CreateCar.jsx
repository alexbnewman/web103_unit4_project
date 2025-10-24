import { useState, useEffect } from "react";

const CreateCar = () => {
  const basePrice = 20000;

  const options = {
    color: [
      { name: "Red", price: 500 },
      { name: "Blue", price: 400 },
      { name: "Black", price: 600 },
    ],
    wheels: [
      { name: "Standard", price: 0 },
      { name: "Sport", price: 1200 },
      { name: "Offroad", price: 1500 },
    ],
    interior: [
      { name: "Fabric", price: 0 },
      { name: "Leather", price: 1800 },
      { name: "Carbon Fiber", price: 2500 },
    ],
    convertible: [
      { name: "No", price: 0 },
      { name: "Yes", price: 4000 },
    ],
  };

  const [car, setCar] = useState({
    name: "",
    color: "",
    wheels: "",
    interior: "",
    convertible: "",
    price: basePrice,
  });

  // dynamically calculate total price whenever an option changes
  useEffect(() => {
    let total = basePrice;
    Object.keys(options).forEach((key) => {
      const chosen = options[key].find((opt) => opt.name === car[key]);
      if (chosen) total += chosen.price;
    });
    setCar((prev) => ({ ...prev, price: total }));
  }, [car.color, car.wheels, car.interior, car.convertible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const createCar = async (e) => {
    e.preventDefault();
    const response = await fetch("/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });

    if (response.ok) window.location = "/";
  };

  return (
    <div className="CreateCar p-6 max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md">
      <h2 className="text-center text-xl font-semibold mb-4">Customize Your Car</h2>
      <form onSubmit={createCar} className="flex flex-col gap-4">
        <label>
          Car Name:
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        {Object.keys(options).map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <select
              name={key}
              value={car[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an option</option>
              {options[key].map((opt) => (
                <option key={opt.name} value={opt.name}>
                  {opt.name} (+${opt.price})
                </option>
              ))}
            </select>
          </label>
        ))}

        <h3 className="text-lg font-bold mt-4 text-center">
          Total Price: ${car.price.toLocaleString()}
        </h3>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCar;
