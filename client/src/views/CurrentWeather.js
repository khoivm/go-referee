import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CurrentWeather extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isLoading: true,
            currentTemp: '',
            humidity: '',
            wind: '',
            windDirection: '',
            currentCondition: '',
            currentConditionDescription: '',
            weatherIcon: '',
            cityName: '',
            cityNotFound: ''
        })
    }

    componentDidMount() {
        fetch('/weather')
            .then(res => res.json())
            .then(data => {
                if(data.data.cod === '404') {
                    this.setState({
                        isLoading: false,
                        cityNotFound: '404'
                    })
                } else {
                    // Determine weather icon
                    let weatherId = data.data.weather[0].id;


                    this.setState({
                        isLoading: false,
                        currentTemp: Math.round(data.data.main.temp) + '°',
                        humidity: data.data.main.humidity + '%',
                        wind: Math.round(data.data.wind.speed) + ' mph',
                        windDirection: data.data.wind.deg,
                        currentCondition: data.data.weather[0].main,
                        currentConditionDescription: data.data.weather[0].description,
                        cityName: data.data.name
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const WeatherCardError = (
            <div className='weatherCardContainer'>
                <div className='weatherCardError'>
                    <img src={NoLocationFound} alt='no location found'/>
                    <p> Whoa! Looks like there was an error with your zipcode.</p>
                    <Link to='/'><button>Try Again</button></Link>
                </div>
            </div>
        )

        const WeatherConditions = (
            this.state.cityNotFound == 404 ? <div> { WeatherCardError } </div> :
                <div>
                    <div className='homeBtn'>
                        <Link to='/'><button>Home</button></Link>
                    </div>
                    <div className='weatherCardContainer'>
                        <div className='weatherCard'>
                            <img src={this.state.weatherIcon} alt='Weather icon'/>
                            <div className='conditionsOverview'>
                                <p>{this.state.currentTemp}</p>
                                <p>{this.state.currentConditionDescription}</p>
                            </div>
                            <div className='conditionDetails'>
                                <p>Humidity: {this.state.humidity} </p>
                                <p>Wind Speed: {this.state.wind} </p>
                            </div>
                        </div>
                        <h4> Location | {this.state.cityName} </h4>
                    </div>
                </div>
        )

        const LoadingDisplay = (
            <div className='loading'>
                <img className='loadingIcon' src={LoadingIcon} alt='loading icon'/>
            </div>
        )

        const CurrentWeatherCard = (
            this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div> {WeatherConditions} </div>
        )

        return (
            <div>
                { CurrentWeatherCard }
            </div>
        )
    }
}

export default CurrentWeather;