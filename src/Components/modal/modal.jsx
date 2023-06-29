import React, { useContext } from "react";
import './modal.scss';
import StoreContext from "../../StoreContext";
import { deleteActionCreator } from "../../Redux/cars-reducers";

const ModalWindow = (props) =>{

    const context = useContext(StoreContext);
    let state = context.getState();

    if(props.mode === 'Delete'){
        return(
            <div className={props.modalActive? "modalWindow active" : "modalWindow" } onClick={()=>{
                props.SetModalActive(false);
            }}>
                <div className="modal-wrap">
                    <div className="modal-body">
                        <h4 className="text-center">Are you sure about deleting this item?</h4>
                        <div className="modal-cntrls d-flex gap-3">
                            <button onClick={()=>{
                                context.dispatch(deleteActionCreator());
                                localStorage.setItem('cars', JSON.stringify(state.cars));
                              
                            }} className="modal-btn btn-yes">Yes</button>
                            <button className="modal-btn btn-no">No</button>
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
                    <div className="modal-body">
                        <h4 className="text-center">Editing</h4>
                        
                    </div>
                </div>
            </div>
        );
    }
    return;
    
}

export default ModalWindow;