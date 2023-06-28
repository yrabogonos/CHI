const ADD_ITEM = 'ADD-ITEM';
const REM_ITEM = 'REM_ITEM';
const LOAD_TO_DEL =  'LOAD-TO-DEL';
const CLEAR_LOAD_TO_DEL = 'CLEAR-LOAD-TO-DEL';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

let initialState =  {
    cars:[
        
    ]
 
}


const CarsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL_STATE:
            console.log('State:',state);
            state.cars = action.cars;
            return state;

      
        default:
            return state;
     }
}
export const setInitialStateActionCreator = (cars) => {
    return {
        type: SET_INITIAL_STATE,
        cars: cars
       
    }
}



export default CarsReducer;