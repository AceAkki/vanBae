import {Link} from "react-router-dom"
import {useState, useEffect} from 'react'

export default function Vans(){
    let [hostVans, setHostVans] = useState(null)

    async function fetchHostData(){
        const data = await fetch("/api/host/vans");
        const res = await data.json();
        setHostVans(res.vans);
    }

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

    useEffect(()=> {
        fetchHostData()
    }, [])

    console.log(hostVans)
    return (
        <section className="host-van-section">
            <h1 className="section-title">
                Your Listed Vans
            </h1>

            <div className="host-vans-wrap">
                {
                    hostVans !== null ? <RenderVans /> : null
                }
            </div>

        </section>
         
    
    )
}