import React, { useState, useEffect } from 'react'
import './Om.scss'
import Header from '../images/run4.jpg'

function Om(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
      if (!data) {
        fetch("https://api.mediehuset.net/rordal/pages/4")
          .then((res) => res.json())
          .then((apidata) => setData(apidata));
      }
    }, [data, setData]);

    return (
        <>
    <div className="OmHeader">
    <h1>Om Rørdal Run 2020</h1>
    <img src={ Header } alt="header"/>
    </div>
            {data ? (
                <section className="Om">
                <h2 key={data.item.id}>{data.item.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.item.content}}></div>
                </section>
            ) : (
                <div>Loading..</div>
            )}
        </>
    )
}

export default Om
