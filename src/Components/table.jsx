import StoreContext from '../StoreContext';
import './table.scss';
import React, { useContext, useState } from 'react';

const MAX = 10;


const Table = () =>{
    const [cur_page, Setcur_page] = useState(0);
    const context = useContext(StoreContext);
    const state = context.getState();
   


    return(
       <StoreContext.Consumer>
        {
            (store) =>{
                const state = store.getState();
                let cars = state.cars.cars;
                let cars_to_show = [];
                for(let i = cur_page*MAX; i< cur_page*MAX + MAX; i++){
                    cars_to_show.push(state.cars.cars[i])
                }
                console.log('To show:',cars_to_show)
                return(
                    <section className='table-container'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                  <th>Company</th>
                                  <th>Model</th>
                                  <th>VIN</th>
                                  <th>Color</th>
                                  <th>Year</th>
                                  <th>Price</th>
                                  <th>Availability</th>
                                  <th>Actions columns</th>
                                </tr>
                                {cars.map(car => <TableItem company={car.car} model={car.car_model} vin={car.car_vin} color={car.car_color} year={car.car_model_year} price={car.price} availability={car.availability} />)}
                               
                                
                            </tbody>
                           
                        
                        </table>
                    {/* <div className="table-cntrl">
                        <button onClick={Setcur_page(cur_page+1)}>next</button>
                        <button onClick={Setcur_page(cur_page-1)}>prev</button>
                    </div> */}
                    </section>
                );
            }
        }
       </StoreContext.Consumer>
    );
}

const TableItem = (props)=>{
    return(
        <tr>
          <td>{props.company}</td>
          <td>{props.model}</td>
          <td>{props.vin}</td>
          <td>{props.color}</td>
          <td>{props.year}</td>
          <td>{props.price}</td>
          <td>{String(props.availability)}</td>
        </tr>
    );
}
export default Table;