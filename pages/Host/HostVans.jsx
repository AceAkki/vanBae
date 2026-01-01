import {Link, redirect, useLoaderData} from "react-router-dom"
import {useState, useEffect} from 'react'

export function loader () {
     async function fetchHostData(){
        const data = await fetch("/api/host/vans", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id:  JSON.parse(localStorage.getItem("user")).userid })
        });
        const res = await data.json();
        // setHostVans(res.vans);
        return res.vans;
    }
    return fetchHostData();
}

export default function Vans(){
    // let [hostVans, setHostVans] = useState(null)
    let hostVans = useLoaderData();
   

    function RenderVans() {
        return hostVans.map(van => (
                        <Link to={`${van.id}`} key={van.id}> 
                            <div className="van-card">
                                <div>
                                    <img src={van.imageUrl} alt="" />
                                </div>
                                <div className="van-dtl">
                                    <h5>
                                        {van.name}
                                    </h5>
                                    <p>
                                        {`$${van.price}/day`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
    }

    // useEffect(()=> {
    //     fetchHostData()
    // }, [])

    // console.log(hostVans)
    return (
        <section className="host-van-section">
            <h1 className="section-title">
                Your Listed Vans
            </h1>

            <div className="host-vans-wrap">
                {/* { 
                    // no needed to add error boundary since loader now handles it by fetching data before
                    hostVans !== null ? <RenderVans /> : null
                } */}
                <RenderVans />
            </div>

        </section>
         
    
    )
}