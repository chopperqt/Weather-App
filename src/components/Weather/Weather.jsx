import React, { useEffect , useCallback } from 'react';

//images
import temp from '../../materials/gradusi.png';
import wind from '../../materials/wind.png';
import weter from '../../materials/weter.png';
import city2 from '../../materials/city2.png';
import { API, KEY } from '../../contacts';

//axios 
import axios from 'axios';


const Weather = ({cityWeather,data, getCityName, fetchCity,setSaveData}) => {

    const [city, setCity] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    let filterData = data.filter(item => item.name === cityWeather);


    // const fetchCityData = useCallback(() => {
    //     setErrorMessage(false)
    //     axios.get(API+cityWeather+KEY)
    //         .then (response => {
    //             let data = response.data;
    //             setCity({data})
    //             setSaveData(prev => [prev,...{data}]);
    //     })
    //     .catch(error => {
    //         setErrorMessage(true)
    //     })
    // }, [city])


    // useEffect(() => {
    //     fetchCityData();
    // }, [])

    return (

        <div className="container__weather">
            <h2><img src={city2} alt="Город"/>{filterData ? filterData[0].name : 'loading'}</h2>
            <h2><img src={temp} alt="Температура"/>{filterData ? <span>{Math.ceil(-273.15 + filterData[0].main.temp)}&#8451; | {Math.ceil(filterData[0].main.temp * 9/5 - 459.67)}&#8457;</span>  : 'loading'}</h2>
            <h2><img src={weter} alt="Влажность"/>{filterData ? filterData[0].main.humidity+'%' : 'loading'}</h2>
            <h2><img src={wind} alt="Ветер"/>{filterData ? filterData[0].wind.speed+' м/сек' : 'loading'}</h2>
        </div>
    )
}
 
export default Weather;