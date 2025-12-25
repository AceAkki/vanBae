import { useOutletContext } from "react-router-dom"
export default function Photos() {
    const data = useOutletContext()
    return (
        <>
        <img src={data.imageUrl}  className="host-van-img"/>
       
        
        </>
    )
}