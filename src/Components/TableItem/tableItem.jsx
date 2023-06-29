import React, { useContext } from "react";
import StoreContext from "../../StoreContext";
import { setIdToDeleteActionCreator } from "../../Redux/cars-reducers";

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
          <td>{String(props.availability)}</td>
          <td className='item-cntrls'>
                <button onClick={()=>{
                    props.SetModalActive(true);
                    props.setMode('Edit');
                }}>edit</button>
                <button onClick={()=>{
                    props.SetModalActive(true);
                    props.setMode('Delete');
                    context.dispatch(setIdToDeleteActionCreator(props.id))

                }}>delete</button>
          </td>
        </tr>
    );
}

export default TableItem;