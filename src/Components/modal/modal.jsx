import React, { useContext, useEffect, useRef, useState } from "react";
import './modal.scss';
import StoreContext from "../../StoreContext";
import { deleteActionCreator, editActionCreator, setObjToEditActionCreator, setPageActionCreator } from "../../Redux/cars-reducers";

const ModalWindow = (props) =>{

    const context = useContext(StoreContext);
    let state = context.getState();
    const colorRef = useRef();
    const price = useRef();
    const av = useRef();

   

    if(props.mode === 'Delete'){
        return(
            <div className={props.modalActive? "modalWindow active" : "modalWindow" } onClick={()=>{
                props.SetModalActive(false);
            }}>
                <div className="modal-wrap">
                    <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-center">Are you sure about deleting this item?</h4>
                        <div className="modal-cntrls d-flex gap-3">
                            <button onClick={()=>{
                                context.dispatch(deleteActionCreator());
                                localStorage.setItem('cars', JSON.stringify(state.cars));
                                props.SetModalActive(false);
                               
                              
                            }} className="modal-btn btn-yes">Yes</button>
                            <button className="modal-btn btn-no" onClick={()=> props.SetModalActive(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if(props.mode === 'Edit'){
        return(
            <div className={props.modalActive? "modalWindow active" : "modalWindow" } onClick={()=>{
                props.SetModalActive(false);
            }}>
                <div className="modal-wrap">
                    <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-center">Editing</h4>
                        <div className="editing-container mt-4 d-flex flex-column gap-2">
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="company">Company:</label>
                                <input disabled id="company" type="text" value={state.cars.objToEdit.car} />
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="model">Model:</label>
                                <input disabled id="model" type="text" value={state.cars.objToEdit.car_model} />
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="vin">VIN code:</label>
                                <input disabled id="vin" type="text" value={state.cars.objToEdit.car_vin} />
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="color">Color:</label>
                                <MemoryInput reference={colorRef} id="color" val={state.cars.objToEdit.car_color}/>
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="year">Year:</label>
                                <input disabled id="year" type="text" value={state.cars.objToEdit.car_model_year} />
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="price">Price:</label>
                                <MemoryInput reference={price} id="price" val={state.cars.objToEdit.price}/>
                            </div>
                            <div className="edit-item d-flex gap-2">
                                <label htmlFor="av">Availability:</label>
                                <MemoryInput reference={av} id="av" val={state.cars.objToEdit.availability}/>
                                
                            </div>
                            <button onClick={()=>{
                                 let object = state.cars.objToEdit;
                                 object.car_color = colorRef.current.value;
                                 object.price = price.current.value;
                                 object.availability = av.current.value;

                                
                                 context.dispatch(setObjToEditActionCreator(object));
                                 context.dispatch(editActionCreator());
                                 localStorage.setItem('cars', JSON.stringify(state.cars));
                                 props.SetModalActive(false);
                            }}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return;
    
} 


function MemoryInput(props) {
    const [inputValue, setInputValue] = useState(props.val);
   
 
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    useEffect(()=>{
        setInputValue(props.val)
    },[props.val])
    
  
    return (
      <input
        ref={props.reference}
        type="text"
        value={inputValue}
        onChange={handleChange}
        id={props.id}
       
      />
    );
  }
export default ModalWindow;