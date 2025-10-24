import {Suspense} from "react";

import Loadable from "../loadable page";
import * as React from "react";

const Loader=({children}:{children:React.ReactNode})=>(
    <Suspense fallback={<Loadable/>}>
        {children}
    </Suspense>
)
export default Loader;