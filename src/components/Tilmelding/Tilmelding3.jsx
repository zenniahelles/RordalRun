import React, {useState, useEffect } from 'react'
import './Tilmelding.scss'
import Header from '../images/run6.jpg'

function Tilmelding(props) {

    //States til at gemme ID og formdata

    const [allRuns, setAllRuns] = useState([])
    const [run_id, setrun_id] = useState(0)
    const [tilmelding, setTilmelding] = useState([])
    const [comment, setComment] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [zipcode, setZipcode] = useState(1)
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState(1)

    //function til fetch af løb liste
    async function fetchAllRuns(){
        let url = `https://api.mediehuset.net/rordal/run`
        let data = await props.doFetch(url)
        setAllRuns(data)
    }


    //function til get af tilmeldingsinfo
    async function getTilmelding(e){
        let headers = {
            'Authorization': `Bearer ${props.loginData.access_token}`
        }

        try {
        const url = `https://api.mediehuset.net/rordal/registrations`
            const response = await fetch(url, headers)
            const data = await response.json()
            setTilmelding(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    //function til at sende en tilmelding

    async function sendTilmelding(e) {
        e.preventDefault()

        let formData = new FormData()

        formData.append('run_id', run_id)
        formData.append('firstname', firstName)
        formData.append('lastname', lastName)
        formData.append('comment', comment)
        formData.append('email', email)
        formData.append('address', address)
        formData.append('zipcode', zipcode)
        formData.append('city', city)
        formData.append('phone', phone)

        let options = {
            method: "POST",
            body: formData,
            headers : {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }


        try {
        const url = `https://api.mediehuset.net/rordal/registrations`
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            getTilmelding()
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllRuns()
    }, [])


    return (
        <>
        <div className="TilmeldingHeader">
        <h1>Tilmelding</h1>
        <img src={ Header } alt="header"/>
        </div>
        
        <section className="Tilmelding">
            
            <h2>Tilmelding til Rørdal Run</h2>
        <form className="FormGrid">
            <div>
            <label>Fornavn:</label>
            <input onChange={(e) => {setFirstName(e.target.value)}}></input>

            <label>Efternavn:</label>
            <input onChange={(e) => {setLastName(e.target.value)}}></input>

            <label for="gender">Vælg køn</label>
            <div className="gender">
            <input type="radio" id="mand" name="køn" value="m"/><span>Mand</span>
            <input type="radio" id="kvinde" name="køn" value="f"/><span>Kvinde</span>
            </div>

            <label>E-mail:</label>
            <input onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>

<div>
            <label>Adresse:</label>
            <input onChange={(e) => {setAddress(e.target.value)}}></input>

            <label>Postnummer:</label>
            <input type="number" onChange={(e) => {setZipcode(e.target.value)}}></input>

            <label>By:</label>
            <input onChange={(e) => {setCity(e.target.value)}}></input>

            <label>Telefon:</label>
            <input onChange={(e) => {setPhone(e.target.value)}}></input>

            <label>Vælg program:</label>
            <select onChange={(e) => {setrun_id(e.target.value)}}>
                <option value={0}>Vælg et løb</option>
                {allRuns.items && allRuns.items.map((item, index) =>{
                    return <option key={index} id={item.id} value={item.id}>{item.title}</option>
                })
            }
            </select>
            </div>
<div>
            <label>Kommentar</label>
                    <input onChange={(e) => {setComment(e.target.value)}}></input>
                    <button onClick={(e)=>{sendTilmelding(e)}}>Tilmeld</button>
                    </div>
                    </form>

            <section>
                {
                    tilmelding.items && tilmelding.items.map((item, index) => {
                       return( 
                        <div key={index}>
                        <p>{item.firstname}</p>
                        <p>{item.lastname}</p>
                        <p>{item.address}</p>
                        <p>{item.zipcode}</p>
                        <p>{item.city}</p>
                        <p>{item.email}</p>
                        <p>{item.gender}</p>
                       <p>____</p>
                       </div>
                       )
                    })
                }
            </section>
                
        </section>
        </>
    )
}

export default Tilmelding
