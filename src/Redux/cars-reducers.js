const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const SET_CUR_PAGE = 'SET-CUR-PAGE';
const SET_SER_PAGE = 'SET-SEARCHING-PAGE';
const MAX = 10;
const SEARCH = 'SEARCH';
const DELETE = 'DELETE';
const SET_ID_TO_DELETE = 'SET-ID-TO-DELETE';
const SET_OBJ_TO_EDIT = 'SET-OBJ-TO-EDIT';
const EDIT = 'EDIT';
const ADD = 'ADD';


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
    idToDelete: NaN,
    objToEdit: {}

 
}


const CarsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL_STATE: 
            state.cars = action.cars;
            state.maxPages =Math.ceil(state.cars.length / MAX);
            return state;
        case SET_CUR_PAGE: 
            state.toShow = state.cars.slice(action.page*MAX, action.page*MAX+MAX);
            return state;
        case SEARCH: 
            let results;
            switch(action.field){
              
                case 'company':
                    results = state.cars.filter(car => car.car === action.value);
                    state.searching.cars = results;
                    state.searching.maxPages =Math.ceil(state.searching.cars.length / MAX);
                    state.searching.toShow = state.searching.cars.slice(0, MAX);
                    break;
                case 'model':
                    results = state.cars.filter(car => car.car_model === action.value);
                    state.searching.cars = results;
                    state.searching.maxPages =Math.ceil(state.searching.cars.length / MAX);
                    state.searching.toShow = state.searching.cars.slice(0, MAX);
                    break;
                case 'year':
                    results = state.cars.filter(car => car.car_model_year == action.value);
                    state.searching.cars = results;
                    state.searching.maxPages =Math.ceil(state.searching.cars.length / MAX);
                    state.searching.toShow = state.searching.cars.slice(0, MAX);
                    break;
            }
            return state;
        case SET_SER_PAGE: 
            state.searching.toShow = state.searching.cars.slice(action.page*MAX, action.page*MAX+MAX);
            return state;
        case DELETE:
            state.cars = state.cars.filter(car => car.id != state.idToDelete);
            state.toShow = state.toShow.filter(car => car.id != state.idToDelete);
            state.searching.toShow = state.searching.toShow.filter(car => car.id != state.idToDelete);
            return state;
        case SET_ID_TO_DELETE:
            state.idToDelete = action.id;
            return state;

        case SET_OBJ_TO_EDIT:
            state.objToEdit = action.object;
            return state;
        case EDIT:
            for(let i =0; i< state.cars; i++){
                if(state.cars[i].id === state.objToEdit.id){
                    state.cars[i] = state.objToEdit;
                    break;
                }
            }
            return state;
        case ADD:
            state.cars.push(action.object);
            state.maxPages =Math.ceil(state.cars.length / MAX);
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
export const searchActionCreator = (field, value) => {
    return {
        type: SEARCH,
        field:field,
        value: value
       
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
export const setObjToEditActionCreator = (object) => {
    return{
        type: SET_OBJ_TO_EDIT,
        object: object
    }
}
export const editActionCreator = () => {
    return{
        type: EDIT
        
    }
}
export const addObjActionCreator = (object) => {
    return{
        type: ADD,
        object: object
    }
}

export default CarsReducer;