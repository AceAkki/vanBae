import {useState, useEffect} from 'react'
import {Link, NavLink, Outlet, useParams} from "react-router-dom"

export default function HostVansDetail(){
    let [vanDt, setVanDt] = useState(null);
    const {id} = useParams();

     async function fetchHostData(id){
        const data = await fetch(`/api/host/vans/${id}`);
        const res = await data.json();
        setVanDt(res.vans);
    }

    function RenderVanData (props) {
        let data = props.data[0];
        return <section className="van-main-dtl">
                <div className="van-dtl-overview">
                    <div className="van-dtl-img">
                            <img src={data.imageUrl} alt="" />
                    </div>
                    <div>
                        <p className={`type-label  ${data.type}`}>{data.type}</p>
                        <p className='van-dtl-name'>{data.name}</p>
                        <p className='van-dtl-price'>$<strong>{data.price}</strong>/day</p>
                    </div>
                </div>

                <div className="van-dtl-nav">
                    <NavLink to="" >Details</NavLink>
                    <NavLink to='price'>Price</NavLink>
                </div>


                <Outlet />


                

            </section>
    }


    useEffect(()=> {
       fetchHostData(id)
    }, [id])
    
    return (
        <section className="van-dtl-section">
            <Link to="../vans">
                Back to All Vans
            </Link>

            {
                vanDt !== null ? <RenderVanData data={vanDt} /> : null

            }


        </section>
         
    
    )
}