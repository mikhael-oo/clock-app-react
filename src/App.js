import React, {useState, useEffect} from "react"
import TimeScreen from "./components/TimeScreen"
import InfoScreen from "./components/InfoScreen"
import DesktopDayBackgroundImage from "./assets/desktop/bg-image-daytime.jpg"
import DesktopNightBackgroundImage from "./assets/desktop/bg-image-nighttime.jpg"
import MobileDayBackgroundImage from "./assets/mobile/bg-image-daytime.jpg"
import MobileNightBackgroundImage from "./assets/mobile/bg-image-nighttime.jpg"
import TabletDayBackgroundImage from "./assets/tablet/bg-image-daytime.jpg"
import TabletNightBackgroundImage from "./assets/tablet/bg-image-nighttime.jpg"

export default function App() {
    const [locationData, setLocationData] = useState({})
    const [timeData, setTimeData] = useState({})
    
    const [info, setInfo] = useState(false);

    const [orientation, setOrientation] = useState("");

    const handleResize = () => {
        if (window.innerWidth <= 375) {
            setOrientation("mobile")
        } else if(window.innerWidth <= 768) {
            setOrientation("tablet")
        } else {
            setOrientation("desktop")
        }
      }
      
    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);
      })

    useEffect(() => {

        

        function pullTimeData() {
            fetch("http://worldtimeapi.org/api/ip")
                .then(res => res.json())
                .then(data => setTimeData(data))
        }
        
        fetch("https://api.ipbase.com/json/?apikey=53d67b20-c05f-11ec-979c-9fb9339b4261")
            .then(res => res.json())
            .then(data => setLocationData(data))

        const interval = setInterval(() => pullTimeData(), 1000)
        return () => { clearInterval(interval) }
    }, [])

    
    function timeOfDay() {
        let date = new Date(timeData.datetime)
        let hour = date.getHours()

        if (hour >= 5 && hour < 18) {
            return "Day"
        } else {
            return "Night"
        }
    }

    function backgroundImageSetter() {
        let timeDay = timeOfDay()
        let backgroundImage
        if (timeDay === "Day") {
            if (orientation === "mobile") {
                backgroundImage = `url(${MobileDayBackgroundImage})`
            } else if (orientation === "tablet") {
                backgroundImage = `url(${TabletDayBackgroundImage})`
            } else {
                backgroundImage = `url(${DesktopDayBackgroundImage})`
            }
        } else {
            if (orientation === "mobile") {
                backgroundImage = `url(${MobileNightBackgroundImage})`
            } else if (orientation === "tablet") {
                backgroundImage = `url(${TabletNightBackgroundImage})`
            } else {
                backgroundImage = `url(${DesktopNightBackgroundImage})`
            }
        }
        return backgroundImage
    }

    

    const style = {
        backgroundImage: backgroundImageSetter()
    }
    

    console.log(locationData)
    console.log(timeData)
    

    return (
        <main style={style}>
            <TimeScreen 
                time={timeData.datetime}
                timezone={timeData.abbreviation}
                city={locationData.city}
                countryCode={locationData.country_code}
                info={info}
                infoSwitch={setInfo}
                orientation={orientation}
            />
            {info && 
            <InfoScreen 
                timeRegion={timeData.timezone}
                dayOfYear={timeData.day_of_year}
                dayOfWeek={timeData.day_of_week}
                weekNumber={timeData.week_number}
                orientation={orientation}
            />}
        </main>
    )
}