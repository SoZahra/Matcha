import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome.jsx'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail.jsx';
import NewProfile from './pages/NewProfile.jsx';

function App(){

    return(
        <Routes>
            <Route path="/" element={<WelcomePage />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/> 
            <Route path="/verify-email" element={<VerifyEmail />}/> 
            <Route path="/new" element={<NewProfile />}/> 

        </Routes>
    )
}

export default App;