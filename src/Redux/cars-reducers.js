const ADD_ITEM = 'ADD-ITEM';
const REM_ITEM = 'REM_ITEM';
const LOAD_TO_DEL =  'LOAD-TO-DEL';
const CLEAR_LOAD_TO_DEL = 'CLEAR-LOAD-TO-DEL';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const SET_CUR_PAGE = 'SET-CUR-PAGE';
const SET_SER_PAGE = 'SET-SEARCHING-PAGE';
const MAX = 10;
const SEARCH = 'SEARCH';
const DELETE = 'DELETE';
const SET_ID_TO_DELETE = 'SET-ID-TO-DELETE';

let initialState =  {
    cars:[
        
    ],
    toShow: [],
    maxPages: NaN,
    searching: {
        cars:[
        
        ],
        toShow: [],
        maxPages: NaN,
    },
    idToDelete: NaN

 
}


const CarsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL_STATE: 
            state.cars = action.cars;
            state.maxPages =Math.round(state.cars.length / MAX);
            return state;
        case SET_CUR_PAGE: 
            state.toShow = state.cars.slice(action.page*MAX, action.page*MAX+MAX);
            return state;
        case SEARCH: 
            console.log('Search State:', state)
            let results = state.cars.filter(car => car.car === action.company);
            state.searching.cars = results;
            state.searching.maxPages =Math.round(state.searching.cars.length / MAX);
            state.searching.toShow = state.searching.cars.slice(0, MAX)
            console.log('Test',state.searching.cars.slice(0, MAX))
            return state;
        case SET_SER_PAGE: 
            state.searching.toShow = state.searching.cars.slice(action.page*MAX, action.page*MAX+MAX)
            return state;
        case DELETE:
            console.log('State:', state)

            state.cars = state.cars.filter(car => car.id != state.idToDelete);
            state.toShow = state.toShow.filter(car => car.id != state.idToDelete);
            state.searching.toShow = state.searching.toShow.filter(car => car.id != state.idToDelete);

            // state.toShow = state.cars.slice(action.page*MAX, action.page*MAX+MAX)

            console.log('After State:', state)
            return state;
        case SET_ID_TO_DELETE:
            state.idToDelete = action.id;
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
export const setSearchingPageActionCreator = (page) => {
    return {
        type: SET_SER_PAGE,
        page: page
       
    }
}
export const searchActionCreator = (company) => {
    return {
        type: SEARCH,
        company: company
       
    }
}
export const deleteActionCreator = () => {
    return {
        type: DELETE
   
       
    }
}
export const setIdToDeleteActionCreator = (id) => {
    return {
        type: SET_ID_TO_DELETE,
        id: id
       
    }
}


export default CarsReducer;