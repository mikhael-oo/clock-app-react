import React, {useState, useEffect} from "react"
import RefreshIcon from "../assets/desktop/icon-refresh.svg"
import ArrowDown from "../assets/desktop/arrow-down.svg"
import ArrowUp from "../assets/desktop/icon-arrow-up.svg"
import MoonIcon from "../assets/desktop/icon-moon.svg"
import SunIcon from "../assets/desktop/icon-sun.svg"

export default function TimeScreen(props) {
    const [refresh, setRefresh] = useState(false)
    const [quoteData, setQuoteData] = useState({})

    let style = {
        "height": props.info ? "50vh" : "100vh"
    }

    useEffect(() => {
        fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
            .then(res => res.json())
            .then(data => setQuoteData(data))
    }, [refresh])

    function convertDateTime(datetime) {
        let datee = new Date(datetime)
        let hours = datee.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})
        let minutes = datee.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})
        return `${hours}:${minutes}`
    }

    function makeGreeting() {
        let date = new Date(props.time)
        let hour = date.getHours()
        let greeting = ""
        if (hour >= 5 && hour < 12) {
            greeting = "GOOD MORNING"
        } else if (hour >= 12 && hour < 18) {
            greeting = "GOOD AFTERNOON"
        } else {
            greeting = "GOOD EVENING"
        }

        let icon;
        if (hour >= 5 && hour < 18) {
            icon = SunIcon
        } else {
            icon = MoonIcon
        }

        return (
            <div className="greeting-container">
                <img src={icon} alt="" />
                <p>{greeting}</p>
            </div>
        )

    }

    const time = convertDateTime(props.time)
    const greeting = makeGreeting()
    console.log(props)
    return (
        <div className="timescreen-container" style={style}>
            {!props.info && 
                <div className="quote-container">
                    <div className="quote">
                        <p>{quoteData.en}</p>
                        <h5>{quoteData.author}</h5>
                    </div>
                    <div>
                        <img className="refresh-icon" src={RefreshIcon} alt="" onClick={() => {setRefresh(prev => !prev)}}/>
                    </div>
                </div>}
            <div className="section-container">
                <div className="clock-face">
                    {greeting}
                    
                    <h1 className="time">{time} <span>{props.timezone}</span></h1>
                    
                    
                    
                    <h3>IN {props.city}, {props.countryCode}</h3>
                </div>
                
                
                <div className="button-container">
                    <button className="switch-button" onClick={() => props.infoSwitch(prev => !prev)}>
                        {props.info ?
                        <div>
                            <p>LESS</p>
                            <div>
                                <img src={ArrowUp} alt="" />
                            </div>
                            
                        </div> :
                        <div>
                            <p>MORE</p>
                            <div>
                                <img src={ArrowDown} alt="" />
                            </div>
                            
                        </div>}
                    </button>
                </div>
            </div>
           
            
        </div>
    )
}
