import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Forside.scss'

function Forside(props) {

    const [runs, setRuns] = useState([])

    async function fetchRuns(){
        const url = `https://api.mediehuset.net/rordal/run`
        let data = await props.doFetch(url)
        setRuns(data)
    }

    useEffect(() => {
        fetchRuns()
    }, [])

return(
    <div className="Forside">
    <section className="ForsideGrid">
    <article>
        <h2>Om Løbet</h2>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit, sed do eiusmod tempor incididunt ut ero labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco poriti laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure
    dolor in reprehenderit in uienply.
    <br/><br/>
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit, sed do eiusmod tempor incididunt ut ero labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco poriti laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure
    dolor in reprehenderit in uienply.
    </p>
    <Link to="/om"><button>MERE INFO</button></Link>
    </article>
    <section className="Ruter">
    <h2>Ruter</h2>
    <p>Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
iste natus error sit voluptartem accusantium doloremque laudantium, totam rem
aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto
beatae vitae dicta sunt explicabo. Nemo eniem ipsam voluptatem quia voluptas sit
aspernatur aut odit aut fugit, sed quia laudantium.</p>

<section className="RunGrid">
    {runs.items && runs.items.map((item, index) => {
                return(
                <div key={index}>
                    <h2>{item.title}</h2>
                    <p>{item.description.slice(0,200)}...</p>
                    <button>TILMELD</button>
                </div>
                )
            })}
    </section>

    </section>
    </section>
    </div>
)

}

export default Forside