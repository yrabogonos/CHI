const ADD_ITEM = 'ADD-ITEM';
const REM_ITEM = 'REM_ITEM';
const LOAD_TO_DEL =  'LOAD-TO-DEL';
const CLEAR_LOAD_TO_DEL = 'CLEAR-LOAD-TO-DEL';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const SET_CUR_PAGE = 'SET-CUR-PAGE';
const MAX = 10;

let initialState =  {
    cars:[
        
    ],
    toShow: [],
    maxPages: NaN,

 
}


const CarsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL_STATE: 
            state.cars = action.cars;
            state.maxPages =Math.round(state.cars.length / MAX);
            return state;
        case SET_CUR_PAGE: 
            state.toShow = state.cars.slice(action.page*MAX, action.page*MAX+MAX)
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

export const setPageActionCreator = (page) => {
    return {
        type: SET_CUR_PAGE,
        page: page
       
    }
}



export default CarsReducer;