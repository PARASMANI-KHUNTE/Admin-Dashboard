import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import Regions from "./Pages/Regions"
import Hotels from "./Pages/Hotels"
import Vehicles from "./Pages/Vehicles"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/region" element={<Regions />}/>
        <Route path="/hotel" element={<Hotels />}/>
        <Route path="/vehicle" element={<Vehicles />}/>
      </Routes>
    </Router>
  )
}

export default App