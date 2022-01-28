import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather-app.css'

let coordinates = {
    lat: 24.914162,
    lng: 67.082216,
    type: "daily"
};

const WeatherForcast = () => {

    // Note: Handeling states here...!
    const [weatherArr, setWeatherArr] = useState([]);

    // Note: This function will call api...!
    const callApi = async () => {

        let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=4fcd41771cc91187db1651ddcc10916f`;

        try {
            let response = await axios({
                method: "GET",
                url: api
            });
            console.log(response);

            if (response.status == 200) {
                let data = response.data.daily;
                setWeatherArr(data);
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    // Note: When this component rendered successfully then this hook will run and call the api...!
    useEffect(() => callApi(), []);

    return (
        <React.Fragment>
            <div className='main-container'>
                {
                    (weatherArr && weatherArr.length > 0)
                        ?
                        (
                            weatherArr.map((item, index) => {
                                return (
                                    <div className='row-container' key={index}>
                                        <h1 className='temp-day'> {item.temp.day} </h1>
                                        <div className='weather-info'>
                                            <img className='icon-style' src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}></img>
                                            <p className='weather-main'>{item.weather[0].main}</p>
                                        </div>

                                    </div>
                                );
                            })
                        )
                        :
                        (
                            <h1> Data Not Found! </h1>
                        )
                }
            </div>
        </React.Fragment>
    );
}

export default WeatherForcast;