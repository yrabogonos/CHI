import { combineReducers, createStore } from "redux";
import CarsReducer, { setPageActionCreator } from "./cars-reducers";





let reducers = combineReducers({
    cars: CarsReducer,
});

let store = createStore(reducers);



export default store;


