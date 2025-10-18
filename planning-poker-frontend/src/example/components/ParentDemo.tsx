import {useState} from "react";
import Functionalcard from "./FunctialCard.tsx";

function Poker() {
    const [count,setCount] = useState(0);
    return (
            <div>
                <Functionalcard title="poker" values={[count]}/>
                <button onClick={()=>setCount(count+1)}>+1</button>
            </div>
    )
}
export default Poker;