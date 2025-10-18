import {useState} from "react";
import Functionalcard from "./FunctialCard.tsx";
import ButtonWithCallback from "./buttonwithcallback.tsx";

function Poker() {
    const [count,setCount] = useState(0);
    function handleClick({}) {
        alert("test")
        setCount(count + 1);
    }
    return (
            <div>
                <Functionalcard title="poker" values={[count]}/>
                <button onClick={()=>setCount(count+1)}>+1</button>
                <ButtonWithCallback onClick={handleClick}/>
            </div>
    )
}
export default Poker;