import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Table from './Components/Table/table';
import { useEffect, useState } from 'react';
import store from './Redux/redux-store';
import { setInitialStateActionCreator, setPageActionCreator } from './Redux/cars-reducers';
import ModalWindow from './Components/modal/modal';
import preloader from './assets/gif/preloader.gif';

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
        console.log('Storage is loading');
        data.cars =data.cars;    
        localStorage.setItem(STORAGE, JSON.stringify(data));
      }
      else{
        console.log('Storage is already loaded'); 
      }
      
    })
}

function App() {

  const [modalActive, SetModalActive] = useState(false);
  const [modalMode, SetModalMode] = useState();
  const [isLoading, SetLoading] = useState(true);
 

  const loadData = async() => {
    const response = await fetchData();
    const cars = (JSON.parse(localStorage.getItem(STORAGE)).cars);
    store.dispatch(setInitialStateActionCreator(cars));
    store.dispatch(setPageActionCreator(0));
    SetLoading(false);
  }
   useEffect(()=>{
    loadData();
   }, [])

   if(isLoading){
    return (
      <div className="App">
          <div className='preloader d-flex flex-column'>
            
              <img className='preload-gif' src={preloader} alt='preloader' />
              <p>Page is loading...</p>
          </div>
      </div>
    );
   }
   else{
    return (
      <div className="App">
          <Table setMode={SetModalMode} modalActive={modalActive} SetModalActive={SetModalActive} />
          <ModalWindow  mode={modalMode} modalActive={modalActive} SetModalActive={SetModalActive}/>
      </div>
    );
   }

  
}

export default App;
