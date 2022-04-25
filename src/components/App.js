import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from './Home'
import Login from './Login'

function App() {
  return (    
    <AuthProvider>
      <Container className="d-flex align-items-center
      justify-content-center"
      style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path ="/signup" element={<Signup/>}/>
                <Route path ="/login" element={<Login/>}/> 
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
