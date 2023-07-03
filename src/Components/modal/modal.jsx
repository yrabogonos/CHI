import React, { useContext, useEffect, useRef, useState } from "react";
import './modal.scss';
import StoreContext from "../../StoreContext";
import { addObjActionCreator, deleteActionCreator, editActionCreator, setObjToEditActionCreator, setPageActionCreator } from "../../Redux/cars-reducers";

const ModalWindow = (props) =>{
    

    const context = useContext(StoreContext);
    let state = context.getState();
    const colorRef = useRef();
    const price = useRef();
    const av = useRef();

    const companyAdd = useRef();
    const modelAdd = useRef();
    const vinAdd = useRef();
    const colorAdd = useRef();
    const yearAdd = useRef();
    const priceAdd = useRef();
    const avAdd = useRef();

    const test = useRef();
    
//    function clear(){
//     window.onlo
//    }
   
   

    // console.log('!!!', state.cars.cars.slice(-1)[0].id)

    switch(props.mode){
        case "Add":
      
            return(
                <div className={props.modalActive? "modalWindow active" : "modalWindow" } onClick={()=>{
                    companyAdd.current.value = '';
                    modelAdd.current.value = '';
                    vinAdd.current.value = '';
                    colorAdd.current.value = '';
                    yearAdd.current.value = '';
                    priceAdd.current.value = '';
                    avAdd.current.value = true;
                    props.SetModalActive(false);
                  
                }}>
                    <div className="modal-wrap">
                        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                            <h4 className="text-center">Add a car:</h4>
                            <div className="add-container mt-4 d-flex flex-column gap-2">
                                <div className="d-flex gap-2">
                                    <span>Company:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={companyAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>VIN:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={vinAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>Model:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={modelAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>Color:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={colorAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>Year:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={yearAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>Price:</span>
                                    <div className="add-input d-flex gap-2">
                                        <input ref={priceAdd} type="text"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span>Availability:</span>
                                    <div className="add-input d-flex gap-2">
                                        <select ref={avAdd} className="availability">
                                            <option value='true'>Yes</option>
                                            <option value='false'>No</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="add-btn" onClick={()=>{
                                     let object = {
                                        availability: avAdd.current.value ==='true'? true: false,
                                        car: companyAdd.current.value,
                                        car_color: colorAdd.current.value,
                                        car_model: modelAdd.current.value,
                                        car_model_year: yearAdd.current.value,
                                        car_vin: vinAdd.current.value,
                                        price: priceAdd.current.value,
                                        id: state.cars.cars.slice(-1)[0].id +1,
                                     }
                                     console.log('Obj', object)
                                     context.dispatch(addObjActionCreator(object));
                                     localStorage.setItem('cars', JSON.stringify(state.cars));
                                     companyAdd.current.value = '';
                                     modelAdd.current.value = '';
                                     vinAdd.current.value = '';
                                     colorAdd.current.value = '';
                                     yearAdd.current.value = '';
                                     priceAdd.current.value = '';
                                     avAdd.current.value = true;
                                     props.SetModalActive(false);
                                }}>Add a car</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Delete":
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
        case "Edit":
            return(
                <div className={props.modalActive? "modalWindow active" : "modalWindow" } onClick={()=>{
                    props.SetModalActive(false);
                }}>
                    <div className="modal-wrap">
                        <div className="modal-body" onClick={(e) =>{
                             e.stopPropagation();
                        }}>
                            <h4 className="text-center">Editing</h4>
                            <div className="editing-container mt-4 d-flex flex-column gap-2">
                                <div className="edit-item d-flex gap-2">
                                    <label htmlFor="car_company">Company:</label>
                                    <input ref={test} disabled id="car_company" type="text" value={state.cars.objToEdit.car} />
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
                                    <MemorySelect reference={av} id="av" val={state.cars.objToEdit.availability}/>
                                    
                                </div>
                                <button onClick={()=>{
                                     let object = state.cars.objToEdit;
                                     object.car_color = colorRef.current.value;
                                     object.price = price.current.value;
                                     object.availability= av.current.value.toLowerCase() ==='true'? true: false;
    
                            
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
        default:
            return;
    }  
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
  function MemorySelect(props) {
    const [inputValue, setInputValue] = useState(props.val);
   
 
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    useEffect(()=>{
        setInputValue(props.val)
    },[props.val])
    
    return (
        <select
          ref={props.reference}
          type="text"
          value={inputValue}
          onChange={handleChange}
          id={props.id}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
         
        </select>
      );
   
  }
export default ModalWindow;