
import Card from "../../../example/components/Card.tsx"
import ResultModal from "../../../example/components/ResultModal.tsx"
import {useState} from "react";

const LandingPage=()=>{
   const [open,setOpen]=useState(false)
    return (
        <div>
       <Card
           title={"login/signup"}
           onClick={()=>setOpen(true)}
       />
        <ResultModal open={open} resultText={"you click"} onClose={()=>setOpen(false)}/>
        </div>
   )

}

export default LandingPage;