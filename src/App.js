import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Table from './Components/table';
import { useEffect } from 'react';
import store from './Redux/redux-store';
import { setInitialStateActionCreator, setPageActionCreator } from './Redux/cars-reducers';

const STORAGE = 'cars';

const fetchData = async() =>{
    return fetch('https://myfakeapi.com/api/cars')
    .then(response =>{
      if (response.ok){
        return response.json();
      }
      else{
        console.log('Can`t get data');
      }
    })
    .then(data => {
      if(!localStorage.getItem(STORAGE)){
        console.log('Storage is loading')
        localStorage.setItem(STORAGE, JSON.stringify(data));
      }
      else{
        console.log('Storage is already loaded'); 
      }
      
    })
}

function App() {

  const loadData = async() => {
    const response = await fetchData();
    const cars = (JSON.parse(localStorage.getItem(STORAGE)).cars);
    store.dispatch(setInitialStateActionCreator(cars));
    store.dispatch(setPageActionCreator(0))
  }
   useEffect(()=>{
    loadData();
   }, [])

  return (
    <div className="App">
        <Table />
    </div>
  );
}

export default App;
