

function Functionalcard ({title,values}:{title:any,values:any}) {
    return (
        <div style={{border: '1px solid black',padding: '10px',borderRadius: '10px'}}>
            <h3>{title}</h3>
            <p>{values}</p>
        </div>
    )
}
export default Functionalcard