import React, {useState} from 'react'
import img from './Assets/2.png'
import axios from 'axios'

function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
            })
            setLocation('')
        }
    }

    return (
        <div className={'w-full h-screen z-[-1] bg-cover px-5'} style={{backgroundImage: `url(${img})`}}>
            <div className={"text-center p-8"}>
                <input className={"w-[50%] p-2 bg-black/20 rounded-lg text-white"}
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter city'
                    type="text"/>
            </div>
            <div className={"max-w-[700px] h-[700px] flex flex-col m-auto justify-between text-white z-20 relative"}>
                <div className={"flex flex-col text-center items-center justify-center"}>
                    <div className={"text-white z-20 font-bold text-2xl"}>
                        <p className={"p-8"}>{data.name}</p>
                    </div>
                    <div className={""}>
                        {data.main ? <h1 className={"text-[136px]"}>{(data.main.temp.toFixed() - 273)} °</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.name !== undefined &&
                    <div className={"flex justify-evenly text-center w-full bg-black/20 opacity-50 rounded-lg"}>
                        <div className={"z-20"}>
                            {data.main ? <p className='bold text-white'>{data.main.feels_like.toFixed() - 273}°</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;


// https://www.youtube.com/watch?v=UjeXpct3p7M


