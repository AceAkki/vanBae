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
        let data = props.data;
        return <div className="van-main-dtl">
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


                <div className='van-more-dtl'>
                    <div className="van-dtl-nav">
                        <NavLink end className={({isActive}) => isActive ? "dtl-nav-active" : null} to="." >Details</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dtl-nav-active" : null} to='price'>Pricing</NavLink>
                        <NavLink className={({isActive}) => isActive ? "dtl-nav-active" : null} to='photos'>Photos</NavLink>
                    </div>


                    <div className='van-dtl-display'>
                        <Outlet context={data}/>
                    </div>

                </div>


                

            </div>
    }


    useEffect(()=> {
       fetchHostData(id)
    }, [id])
    
    return (
        <section className="van-dtl-section">
            <Link 
                // to="../vans"

                //another method
                to=".."
                relative='path'
                className='van-dtl-back'
                >
                &larr; Back to All Vans
            </Link>

            {
                vanDt !== null ? <RenderVanData data={vanDt} /> : null

            }


        </section>
         
    
    )
}