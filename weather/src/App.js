import React, {useState} from 'react'
import img1 from './Assets/2.png'
import img2 from './Assets/22.png'
import axios from 'axios'
// import sky from './Assets/sky.mp4'
// import Nature from './Assets/WildlifeNature.mp4'

function App() {
    const [nav, setNav] = useState(true)
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const handleBg = () => {
        setNav(!nav)
    }

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
        <div className={'w-full h-screen z-[-1]'}>
            {nav ?
                <img className={"top-0 left-0 w-full h-screen object-cover absolute z-[-1] object-cover"} src={img1} alt={"1"}/>
                : <img className={"top-0 left-0 w-full h-screen object-cover absolute z-[-1] object-cover"} src={img2} alt={"2"}/>}

            {/*<div className={'w-full h-screen z-[-1] bg-cover px-5'} style={{backgroundImage: `url(${img})`}}>*/}
            <div className={"text-center pt-10 md:py-20"}>
                <input className={"w-[50%] p-2 bg-white/20 rounded-lg text-white "}
                       value={location}
                       onChange={event => setLocation(event.target.value)}
                       onKeyPress={searchLocation}
                       placeholder='Enter city'
                       type="text"/>
            </div>
            <div className={"max-w-[700px] flex flex-col m-auto justify-between text-white z-20 relative"}>
                <div className={"flex flex-col text-center items-center justify-center my-8"}>
                    <div className={"text-white z-20 font-bold text-2xl"}>
                        <p className={" p-8 text-2xl md:text-4xl uppercase"}>{data.name}</p>
                    </div>
                    <div className={""}>
                        {data.main ? <h1 className={"text-[100px] md:text-[136px]"}>{(data.main.temp.toFixed() - 273)}°</h1> : null}
                    </div>
                    <div>
                        {data.weather ? <p className={'text-2xl text-bold my-5 uppercase'}>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.name !== undefined &&
                    <div className={"flex justify-evenly text-center w-full bg-white/10 opacity-100 rounded-lg "}>
                        <div className={"z-20"}>
                            {data.main ?
                                <p className='bold text-white'>{data.main.feels_like.toFixed() - 273}°</p> : null}
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
                <div className={"max-w-[500px] flex m-auto text-2xl mt-4"}>
                    <button onClick={handleBg}
                            className={"w-full border text-white px-10 py-2 font-bold hover:text-cyan-500 rounded-2xl"}>Change
                        Background
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;


// https://www.youtube.com/watch?v=UjeXpct3p7M


