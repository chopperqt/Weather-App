import React, { Component , useRef, useState, useContext, useEffect, useMemo, useCallback} from 'react';
//components
import {
  Cities,
  Weather,
  Informer,
  Preloader
} from './components';
import './App.css';

//react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";


//axios
import axios from 'axios';
//fetch 
import {API,KEY} from './contacts';
//images
import Logo from './materials/logo.png';
//uuid 
import {v4 as uuidv4} from 'uuid';
import { AlertProvider, AlertContext, AlertContextToggle } from './components/Alert/AlertContext';


const App = () =>  {

  const [cityArray, setCityArray] = useState(['Казань','Москва']);
  const [dataCity, setDataCity] = useState([]);
  const [oldDataCity, setOldDataCity] = useState([]); // default dataCityName = dataCity
  const [dataCityNames, setDataCityNames] = useState([]); //default dataCityNames = cityArray



  const [error, setError] = useState(false);
  const inputElement = useRef(null);

  const toggle = useContext(AlertContextToggle);

  const closeError = useCallback(() => {
    setError(prev => !prev)
  }, [error])


  const fetchDataItems = value => {
    axios.get(API+value+KEY)
    .then(response => {
      let data = response.data;
        setDataCity(prev => [data,...prev]);
        setDataCityNames(prev => [data.name,...prev]);
    }) 
    .catch(error => console.log(error));
  }


  const fetchDataItem = value => {
    axios.get(API+value+KEY)
    .then(response => {
      let data = response.data;
      let filterData = dataCityNames.filter(item =>  item == data.name);
      console.log(filterData);

      if (filterData.length == 0) {
        setDataCity(prev => [data,...prev]);
        setDataCityNames(prev => [data.name,...prev]);
      }else {
        setError(true);
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    setOldDataCity(dataCity);
  } , [dataCity])

  useEffect(() => {
    cityArray.forEach(item => fetchDataItems(item));
  }, [])

  // async function fetchCityDataItems(value) {
  //   await axios.get(API+value+KEY)
  //   .then(response => {
      
  //     let data = response.data;
  //     setCityName(prev => [data.name,...prev])
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }



  //Валидация на одинаковые значения
  function validationInput(name) {
    
    //Проверка на одинаковые значения в массиве
    const sameValue = cityArray.filter(item => item.toLowerCase() == name.toLowerCase());

    return (sameValue.length !== 0) ? false : true;
  }

  //Добавление города в массив
  function clickAddCity() {
    let preValue = inputElement.current.children[1].children[0];

    let value = inputElement.current.children[1].children[0].value;

    if (validationInput(value)) {
      fetchDataItem(value)
    }else {
      setError(prev => !prev)
    }
  }

  //Обработка события изменения input
  function changeAddInput(event) {
    const {addInputValue} = this.state;

    this.setState({
      addInputValue: event.target.value
    })
  }
  return (
    <AlertProvider>
      <div className="App">
        <div className="container__max">
        <Router>
          <div className="container__header" id="logo">
            <NavLink to="/"><img src={Logo} alt="Погода"/><h1>Погода</h1></NavLink>
          </div>
          <div className="container">
              <Switch>
                <Route path="/">
                  {dataCityNames ? dataCityNames.map(item => (
                    <Weather key={uuidv4()} cityWeather={item} data={oldDataCity} /> 
                  )): 'loading'}

{/* 
                  {cityArray ? cityArray.map(item => (
                    <Weather key={uuidv4()} cityWeather={item}  />
                  )): cityArray.map(item => (
                    <Preloader />
                  ))} */}
                </Route>
                <Route path="/city/:id">
                  <Weather  />
                </Route>
              </Switch>
              <Cities
                error={error}
                setError={closeError}
                addCity={clickAddCity} 
                changeAddInput={changeAddInput}
                cityArray={cityArray}
                inputValue={inputElement}
              />
          </div>
        </Router> 
        </div>
      </div>
    </AlertProvider>
  );
}
 
export default App;
