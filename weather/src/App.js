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
        <div className={"w-full h-screen"}>
            <div className={"h-full w-full absolute z-[-1]"}>
                {nav ? <img className={"absolute h-full w-full object-cover"} src={img1}/>
                    : <img className={"absolute h-full w-full object-cover"} src={img2}/>}
            </div>
            <div className={"max-w-[700px] h-full grid grid-cols-1 grid-rows-4 text-white text-center m-auto p-4"}>
                <div className={'w-[70%] m-auto text-white'}>
                    <input className={"w-full rounded-2xl px-4 py-1 bg-white/10 text-white"}
                           value={location}
                           onChange={event => setLocation(event.target.value)}
                           onKeyPress={searchLocation}
                           placeholder='Enter city'
                           type="text"/>
                </div>
                <div className={"max-h-[50%] flex justify-evenly items-center md:text-amber-700 lg:text-amber-900"}>
                    <div className={""}>
                        {nav ? <p className={"text-4xl text-white"}>{data.name}</p>
                            : <p className={"text-4xl text-zinc-700"}>{data.name}</p>}

                    </div>
                    {nav ?  <div className={"text-[70px] text-white lg:text-[200px]"}>
                        {data.main ?
                            <h1 className={""}>{(data.main.temp.toFixed() - 273)}°</h1> : null}
                    </div>
                    :  <div className={"text-[70px] text-zinc-700 md:text-[200px]"}>
                            {data.main ?
                                <h1 className={""}>{(data.main.temp.toFixed() - 273)}°</h1> : null}
                        </div>}
                    {nav ?  <div className={"text-4xl text-white"}>
                        {data.weather ?
                            <p className={' text-4xl'}>{data.weather[0].main}</p> : null}
                    </div>
                        :  <div className={"text-4xl text-zinc-700"}>
                        {data.weather ?
                            <p className={' text-4xl'}>{data.weather[0].main}</p> : null}
                    </div>}
                </div>
                <div className={""}>
                    {data.name !== undefined &&
                        <div
                            className={"flex justify-evenly items-center bg-white/10 rounded-xl"}>
                            <div className={"z-20"}>
                                {data.main ?
                                    <p className=''>{data.main.feels_like.toFixed() - 273}°</p> : null}
                                <p>Feels Like</p>
                            </div>
                            <div className="">
                                {data.main ? <p className=''>{data.main.humidity}%</p> : null}
                                <p>Humidity</p>
                            </div>
                            <div className="">
                                {data.wind ? <p className=''>{data.wind.speed.toFixed()} MPH</p> : null}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    }
                </div>
                <div className={"flex justify-evenly items-center lg:text-amber-900"}>
                    <button onClick={handleBg}
                            className={"bg-white/30 px-6 py-2 rounded-xl"}>Change
                        Background
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;


// https://www.youtube.com/watch?v=UjeXpct3p7M


