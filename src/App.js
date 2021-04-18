import './App.css';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePageComponent from './components/HomePage/homepage'
import HeaderComponent from './components/Common/Header/header';
import store from './redux/store'

function App() {
  return (
    <HashRouter>
      <Provider store={store} >
        <HeaderComponent />
        <HomePageComponent />
      </Provider>
    </HashRouter>
  );
}

export default App;
