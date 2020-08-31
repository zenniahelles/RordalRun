import React, { useState, useEffect } from 'react';
import Style from './Hoteller.module.scss';

function Hoteller(props) {

    const [countries, setCountries] = useState([])
    const [countryId, setCountryId ] = useState(0)
    const [cities, setCities ] = useState([])
    const [hotels, setHotels] = useState ([])
    const [cityId, setCityId] = useState(0)

    async function fetchCountries(){
        const url = `https://api.mediehuset.net/overlook/countries`
        let data = await props.doFetch(url)
        setCountries(data)
    }

    async function fetchCities(id){
        const url = `https://api.mediehuset.net/overlook/cities/by_country/${id}`
        let data = await props.doFetch(url)
        setCities(data)
    }

    async function fetchHotels(id){
        const url = `https://api.mediehuset.net/overlook/hotels/by_city/${id}`
        let data = await props.doFetch(url)
        setHotels(data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (!countryId == 0) {
        fetchCities(countryId)
        }
    },[countryId])

    useEffect(() => {
        if (!cityId == 0) {
        fetchHotels(cityId)
        }
    },[cityId])

    console.log(hotels)

    return(
        <>
            <div>Lande</div>

            {!cities.items && countries && countries.items && countries.items.map((item, index) => {
                return(
                <div key={index} className={Style.Wrapper}>
                    <h2>{item.name}</h2>
                <img id={item.id} onClick={(e) => {setCountryId(e.target.id)}} src={item.image} alt="country"></img>
                </div>
                )
            })}

            {!hotels.items && cities.items && cities.items.map((item, index) => {
                return(
                    <div key={index} className={Style.Wrapper}>
                        <h2>{item.name}</h2>
                        <img id={item.id} onClick={(e) => {setCityId(e.target.id)}} src={item.image} alt="city"></img>
                    </div>
                )
            })}

            {hotels.items && hotels.items.map((item, index) => {
                return(
                    <div key={index} className={Style.Wrapper}>
                        <h2>{item.title}</h2>
                        <img id={item.id} onClick={(e) => {console.log(e.target.id)}} src={item.image} alt="city"></img>
                    </div>
                )
            })}
        </>
    )
}

export default Hoteller;

// usestate er det samme som en almindelig javascript funktion. den første
// er variabel, den anden er funktionen.

// man kan ikke bare smide fetchCountries() ind alene, for så fetcher den igen
// og igen og igen.

// Bruger man en useeffect smider den kun fetchCountries ind en gang hvis 
// man har et tomt array []

// når man skriver  {countries && countries.map så tjekker man først om
// countries kommer ud, og så mapper man countries bagefter, ellers kan
// den ikke finde ud af det.
// && går kun videre hvis det første er true og den findes.