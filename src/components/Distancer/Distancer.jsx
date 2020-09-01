import React, { useState, useEffect } from 'react';
import './Distancer.scss';
import run2 from '../images/run2.jpg'

function Distancer(props) {

    const [titles, setTitles] = useState([])
    const [titleId, setTitleId ] = useState(0)
    const [description, setDescription ] = useState([])

    async function fetchTitles(){
        const url = `https://api.mediehuset.net/rordal/run`
        let data = await props.doFetch(url)
        setTitles(data)
    }

    async function fetchDescription(id){
        const url = `https://api.mediehuset.net/rordal/run/${id}`
        let data = await props.doFetch(url)
        setDescription(data)
    }


    useEffect(() => {
        fetchTitles()
    }, [])

    useEffect(() => {
        if (!titleId == 0) {
        fetchDescription(titleId)
        }
    },[titleId])


    return(
        <div className="Distancer">
            <h2>Distancer</h2>
            <p>Rørdal Run er for alle. Derfor er det muligt både at løbe og gå på alle distancer i alle byer. Samtidig er der distancer helt ned til 1,6 km. Hvis du
vælger et løbeheat, fx 5 km - Run betyder det ikke, at du SKAL løbe hele vejen. Du må selvfølgelig godt tage et par gå-pauser undervejs</p>
<section className="DistanceGrid">
    <div className="gridItem1">
        <h3>Vælg en distance på listen for at læse mere</h3>
            {titles && titles.items && titles.items.map((item, index) => {
                return(
                <div key={index}>
                    <button id={item.id} onClick={(e) => {setTitleId(e.target.id)}}>{item.title}</button>
                </div>
                )
            })}
                    <h3>{description.item && description.item.title}</h3>
        <p>{description.item && description.item.description}</p>
    </div>


    <div className="gridItem2">
            <img src={run2}/>
    </div>
    </section>

        </div>
    )
}

export default Distancer;