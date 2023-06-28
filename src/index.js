import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/redux-store';
import { Provider } from './StoreContext';




const root = ReactDOM.createRoot(document.getElementById('root'));


let rerenderDom = () =>{
  root.render(
    <Provider store={store}>
        <App />
    </Provider>
  );
}
rerenderDom(store.getState());
store.subscribe(() => {
  rerenderDom();
});