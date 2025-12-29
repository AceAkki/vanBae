import { useRouteError } from "react-router-dom"

export default function Error(){
    let err = useRouteError();
    return (
        <section>
            <h1>Error Occured Due To :</h1>
            <pre>{err.message}</pre>
        </section>
    )
}