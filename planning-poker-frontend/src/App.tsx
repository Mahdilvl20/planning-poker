import {RouterProvider} from "react-router-dom";
import mainRoutes from "./view/mainroutes.tsx";

const App=()=>{
    return <RouterProvider router={mainRoutes}/>
};

export default App
