import './App.css';
import {FcGlobe} from 'react-icons/fc'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/profile/:uid' element={<Profile />}/>
          <Route exact path='/login' element={<LoginPage />}/>
          <Route exact path='/reset' element={<ResetPassword />}/>
          <Route exact path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
