import React, { useState, useEffect } from 'react'
import './Deltagerliste.scss'
import Header from '../images/run3.JPG'

function Deltagerliste(props) {

    const [searchText, setSearchText] = useState("Søg efter et navn...");
    const [apiData, setApiData] = useState(null);

    async function getSearch() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');

        try {
            const request = await fetch('https://api.mediehuset.net/rordal/search/' + searchText, { headers: fetchHeaders });
            const response = await request.json();
            setApiData(response)
        } catch (error) {
            console.log('getSearch -> Error', error);
        }
    }

    const RunType = (id) => {
        switch(id) {
            case "1":
                return "10 Km"
            case "2":
                return "5 Km"
            case "3":
                return "1 Mile"   
            }
    }

    return (
        <>
        <div className="DeltagerHeader">
        <h1>Deltagerliste</h1>
        <img src={ Header } alt="header"/>
        </div>

        <div className="Deltagerliste">
            <h2>Deltagerliste Rørdal Run</h2>
            <p>Vi kommer i godt selskab 14. april 2021. Se, hvem der har tilmeldt sig i Rørdal Run</p>

            <div className="SearchArea">
	        <input type="text" className="searchfield" onFocus={() => setSearchText("")} onChange={(e) => setSearchText(e.target.value)} value={searchText}></input>
            <button onClick={()=>getSearch()} className="searchbutton">Søg</button>

            {apiData &&        
                <span>Fandt <b>{apiData && apiData.num_items}</b> resultater</span>                  
            }
        </div>

        <div>
            <div className="ResultsGrid ResultTitles">
                <span>Start nr.:</span>
                <span>Navn:</span>
                <span>By:</span>
                <span>Løb:</span>
            </div>
            {                          
                apiData && apiData.items.map(searchitem => (
                    <div   className="ResultsGrid" key={searchitem.id}>
                        <span>{searchitem.id}</span>
                        <span>{searchitem.firstname} {searchitem.lastname}</span>
                        <span>{searchitem.city}</span>
                        <span>{RunType(searchitem.run_id)}</span> 
                    </div>
            ))}
        </div>

    </div>
</>
)
}

export default Deltagerliste




