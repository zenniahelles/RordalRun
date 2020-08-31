import React, {useState, useEffect } from 'react'

function Ratings(props) {

    const [allHotels, setAllHotels] = useState([])
    const [hotelId, setHotelId] = useState(0)
    const [ratings, setRatings] = useState([])
    const [comment, setComment] = useState("")
    const [numberStars, setNumberStars] = useState(1)

    async function fetchAllHotels(){
        let url=`https://api.mediehuset.net/overlook/hotels/by_city/0`
        let data = await props.doFetch(url)
        setAllHotels(data)
    }

    async function getRatings(e){
        let headers = {
            'Authorization': `Bearer ${props.loginData.access_token}`
        }

        try {
        const url = `https://api.mediehuset.net/overlook/ratings/list_by_hotel/${hotelId}`
            const response = await fetch(url, headers)
            const data = await response.json()
            setRatings(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function sendComment(e) {
        e.preventDefault()

        let formData = new FormData()

        formData.append('hotel_id', hotelId)
        formData.append('num_stars', numberStars)
        formData.append('comment', comment)

        let options = {
            method: "POST",
            body: formData,
            headers : {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }


        try {
        const url = `https://api.mediehuset.net/overlook/ratings`
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            getRatings()
        }
        catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchAllHotels()

    }, [])

    useEffect(() => {
        if(!hotelId == 0){
            getRatings()
        }
    }, [hotelId])

    console.log(allHotels)
    console.log(ratings)

    return (
        <>
            <h2>Ratings side</h2>
            <select onChange={(e) => {setHotelId(e.target.value)}}>
                <option value={0}>Vælg et hotel</option>
                {
                    allHotels.items && allHotels.items.map((item, index) =>{
                        return <option key={index} value={item.id} id={item.id}>{item.title}</option>
                    })
                }
            </select>

            <section>
                {
                    ratings.items && ratings.items.map((item, index) => {
                       return( 
                        <div key={index}>
                       <p>{item.comment}</p>
                       <p>{item.num_stars}</p>
                       <p>____</p>
                       </div>
                       )
                    })
                }
            </section>

                <form>
                    <label>Kommentar</label>
                    <input onChange={(e) => {setComment(e.target.value)}}></input>
                    <select onChange={(e) => {setNumberStars(e.target.value)}}>
                        <option value={1}>1 stjerne</option>
                        <option value={2}>2 stjerner</option>
                        <option value={3}>3 stjerner</option>
                        <option value={4}>4 stjerner</option>
                        <option value={5}>5 stjerner</option>
                    </select>
                    <button onClick={(e) => {sendComment(e)}}>Send Kommentar</button>
                </form>

        </>
    )
}

export default Ratings
