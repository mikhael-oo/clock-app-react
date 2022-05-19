import React from "react"

export default function InfoScreen(props) {
    return (
        <div className="info-container">
            <div className="outer-group">
                <div className="info">
                    <p>CURRENT TIMEZONE</p>
                    <h1>{props.timeRegion}</h1>
                </div>
                <div className="info">
                    <p>DAY OF THE YEAR</p>
                    <h1>{props.dayOfYear}</h1>
                </div>
            </div>
            <div className="outer-group">
                <div className="info">
                    <p>DAY OF THE WEEK</p>
                    <h1>{props.dayOfWeek}</h1>
                </div>
                <div className="info"> 
                    <p>WEEK NUMBER</p>
                    <h1>{props.weekNumber}</h1>
                </div>
            </div>
        </div>
    )
}