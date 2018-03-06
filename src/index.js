import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/store';
// import registerServiceWorker from './registerServiceWorker';
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
