import React, { useState, useEffect } from 'react'
import './Om.scss'

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
