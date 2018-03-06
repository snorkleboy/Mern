import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import configureStore from './components/store/store';
const store = configureStore();
document.addEventListener('DOMContentLoaded',()=>{
    const root = document.getElementById('root')
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
        , root   
        
    );
})
