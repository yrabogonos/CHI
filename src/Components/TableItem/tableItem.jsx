import React, { useContext } from "react";
import StoreContext from "../../StoreContext";
import { setIdToDeleteActionCreator, setObjToEditActionCreator } from "../../Redux/cars-reducers";
import './tableItem.scss';

const TableItem = (props)=>{
    const context = useContext(StoreContext);
    return(
        <tr>
          <td>{props.company}</td>
          <td>{props.model}</td>
          <td>{props.vin}</td>
          <td>{props.color}</td>
          <td>{props.year}</td>
          <td>{props.price}</td>
          <td className={props.availability? "green": "red"}>{String(props.availability)}</td>
          <td className='item-cntrls d-flex align-items-center justify-content-center gap-4'>
                <button className="edit-btn" onClick={()=>{
                    props.SetModalActive(true);
                    props.setMode('Edit');
                    context.dispatch(setObjToEditActionCreator(props.object));
                }}></button>
                <button className="delete-btn" onClick={()=>{
                    props.SetModalActive(true);
                    props.setMode('Delete');
                    context.dispatch(setIdToDeleteActionCreator(props.id));

                }}></button>
          </td>
        </tr>
    );
}

export default TableItem;