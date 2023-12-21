import './App.css';
import MainPage from './components/MainPage/MainPage';
import {Routes, Route} from 'react-router-dom';
import MyNotes from './components/MyNotes/MyNotes';
import Services from './components/Services/Services';
import Salons from './components/Salons/Salons';
import Profile from './components/Profile/Profile';
import Preprofile from './components/Preprofile/Preprofile';
import About from './components/About/About';
import Api from './utils/Api'
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
  const[currentUser, setCurrentUser] = useState({});
  const [clientId, setClientId] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      //authorization: '79aff481-506e-4c4c-8308-be7829df1002',
      'Content-Type': 'application/json',
    },
  });

  function getInfoAboutUser() {
    api
      .getUserInfo()
      .then((clientData) => {
        console.log('идет с сервера', clientData);
        setCurrentUser(clientData);
        setClientId(clientData.clientId);
        setName(clientData.clientName);
        setGender(clientData.clientGender);
        setPhone(clientData.clientPhone);
        setEmail(clientData.clientEmail);
      })
      .catch((error) => console.log(error));
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='App'>
      
      <Routes>
            <Route path="/" 
              element={<MainPage/>}
            />
            <Route path="/mynotes" element={<MyNotes/>}/>
  
            <Route path="/profile" element={<Profile onEditProfile={getInfoAboutUser}/>}
            />
            <Route path="/preprofile" element={<Preprofile/>}
            />
            <Route path="/signup" element={<Services/>}
            />
            <Route path="/salons" element={<Salons/>}
            />
            <Route path="/aboutus" element={<About getInfo={getInfoAboutUser}/>}
            />
          </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
