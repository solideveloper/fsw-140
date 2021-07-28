import React, { useState } from 'react';
import AddFlavor from './AddFlavors'
import './ammosoul.css';

function Flavors(props){

    const { __v, _id, name, price, image, available} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div>
        <h1 className="badge-title">Badge:</h1>
        </div>
        <div className="container">
        { !editToggle ?
        <> 
            <p className="badge-text"> name: { name }</p>
            <p className="badge-text">price: { price } image: { image }</p>
            <p className="badge-text"> available: { available } </p>
           
          
            <div>
            <button
                className="delete-btn"
                onClick={() => props.deleteFlavor(name)}>
                Delete
            </button>
            <button
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddFlavor
                __v={__v}
                _id={_id}
                name={name}
                price={price}
                image={image}
                available={available}
                btnText="Submit Edit" 
                submit={props.editFlavor}
            />
            <button
                className="delete-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Flavors;