import React, { useState } from "react";

function AddFlavors(props) {
  const initInputs = {
    name: props.name || "",
    price: props.price || "",
    image: props.image || "",
    available: props.available || "",

  };

  const [inputs, setInputs] = useState(initInputs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    props.submit(inputs, props.FlavorId);
    setInputs(initInputs);
  };

  return (
    <div>
      <h1 className="form-title">Information Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="First Name"
            className="form-text"
          />
          <input
            type="text"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="Last Name"
            className="form-text"
          />
          <input
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            placeholder="Street Address"
            className="form-text"
          />
          <input
            type="text"
            name="available"
            value={inputs.available}
            onChange={handleChange}
            placeholder="City"
            className="form-text"
          />
         
          <button className="add-btn">{props.btnText}</button>
        </form>
      </div>
    </div>
  );
}

export default AddFlavors;
