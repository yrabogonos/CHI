
import { searchActionCreator, setPageActionCreator, setSearchingPageActionCreator } from '../../Redux/cars-reducers';
import StoreContext from '../../StoreContext';
import './table.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import TableItem from '../TableItem/tableItem';



const Table = (props) =>{
    const [cur_page, Setcur_page] = useState(0);
    const [ser_page, Setser_page] = useState(0);
    const [mode, Setmode] = useState('All');
    const company = useRef();
    
    switch(mode){
        case 'All':
            return(
                <StoreContext.Consumer>
                 {
                     (store) =>{
                         const state = store.getState();
                         let cars = state.cars.toShow;
                        //  console.log(cars.id)
                         return(
                             <section className='table-container'>
                                 <div className="table-search mb-4">
                                     <h4 className='mt-3'>Search</h4>
                                     <label htmlFor="company">Company:</label>
                                     <input ref={company} id='company' type="text" />
                                     <button onClick={()=>{
                                         store.dispatch(searchActionCreator(company.current.value));
                                         Setmode('Search');
                                     }} className='search-btn'>Search</button>
                                 </div>
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
                                         {cars.map(car => <TableItem id={car.id} setMode={props.setMode} modalActive={props.modalActive} SetModalActive={props.SetModalActive} company={car.car} model={car.car_model} vin={car.car_vin} color={car.car_color} year={car.car_model_year} price={car.price} availability={car.availability} />)}
                                        
                                         
                                     </tbody>
                                    
                                 
                                 </table>
                             <div className="table-cntrl">
                                 <button onClick={()=>{
                                     if(cur_page < state.cars.maxPages-1){
                                         Setcur_page(cur_page+1);
                                         store.dispatch(setPageActionCreator(cur_page+1));
                                     }
                                     else{
                                         alert('End of Table')
                                     }
                                     
                                 }}>next</button>
                                <button onClick={()=>{
                                     if(cur_page > 0){
                                         Setcur_page(cur_page-1);
                                         store.dispatch(setPageActionCreator(cur_page-1));
                                     }
                                    
                                 }}>prev</button>
                             </div>
                             </section>
                         );
                     }
                 }
                </StoreContext.Consumer>
             );
        case 'Search':
            return(
                <StoreContext.Consumer>
                 {
                     (store) =>{
                         const state = store.getState();
                         let cars = state.cars.searching.toShow;
                         return(
                             <section className='table-container'>
                                 <h3>Results of searching:</h3>
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
                                         {cars.map(car => <TableItem id={car.id} setMode={props.setMode} modalActive={props.modalActive} SetModalActive={props.SetModalActive} company={car.car} model={car.car_model} vin={car.car_vin} color={car.car_color} year={car.car_model_year} price={car.price} availability={car.availability} />)}
                                        
                                         
                                     </tbody>
                                    
                                 
                                 </table>
                             <div className="table-cntrl">
                                 <button onClick={()=>{
                                     if(ser_page < state.cars.searching.maxPages-1){
                                         Setser_page(ser_page+1);
                                         store.dispatch(setSearchingPageActionCreator(ser_page+1));
                                     }
                                     else{
                                         alert('End of Table')
                                     }
                                     
                                 }}>next</button>
                                <button onClick={()=>{
                                     if(ser_page > 0){
                                        Setser_page(ser_page-1);
                                         store.dispatch(setSearchingPageActionCreator(ser_page-1));
                                     }
                                    
                                 }}>prev</button>
                                 <button onClick={()=>{
                                    Setmode('All');
                                    Setser_page(0);
                                 }}>Home</button>
                             </div>
                             </section>
                         );
                     }
                 }
                </StoreContext.Consumer>
             );

    }

   
   
}

// const TableItem = (props)=>{
//     return(
//         <tr>
//           <td>{props.company}</td>
//           <td>{props.model}</td>
//           <td>{props.vin}</td>
//           <td>{props.color}</td>
//           <td>{props.year}</td>
//           <td>{props.price}</td>
//           <td>{String(props.availability)}</td>
//           <td className='item-cntrls'>
//                 <button>edit</button>
//                 <button>delete</button>
//           </td>
//         </tr>
//     );
// }
export default Table;