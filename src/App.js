import './App.css';
import {FcGlobe} from 'react-icons/fc'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/profile' element={<Profile />}/>
          <Route exact path='/profileEdit' element={<EditProfile />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
