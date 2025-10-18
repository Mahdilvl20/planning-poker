
import './App.css'
import Functionalcard from "./example/components/FunctialCard.tsx";
import UserBadge from "./example/components/userbadge.tsx";
function App() {


  return (
      <div>

      <Functionalcard title="poker" values='0'/>
      <UserBadge name="poker" score={0} />
      <UserBadge/>
      </div>
  )
}

export default App
