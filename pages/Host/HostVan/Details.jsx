export default function Details(props) {
    return (
        <>
        <p>
            <strong>
                Name : 
            </strong>

            {props.name}

        </p>
        <p>
            <strong>
                Category : 
            </strong>

            {props.type}

        </p>
        <p>
            <strong>
                Description : 
            </strong>

            {props.description}

        </p>
        <p>
            <strong>
                Visibility : 
            </strong>

            Public

        </p>
        
        </>
    )
}