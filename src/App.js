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
  //const [dataForPreprofile, setDataForPreprofile] = useState(null);

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
      })
      .catch((error) => console.log(error));
  }

  function updateUserInfo(data) {
    console.log("inside app js", data);
    api.editProfile(data)
    .then((user) => {
      console.log('POST : идет с сервера ', user);
      setCurrentUser(user);
    })
    .catch((error) => console.log(error));
  }

  //   useEffect(() => {
  //     // Сохраняем currentUser в localStorage
  //     localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='App'>
      
      <Routes>
            <Route path="/" element={<MainPage/>}
            />
            <Route path="/mynotes" element={<MyNotes/>}/>
  
            <Route path="/profile" element={<Profile onEditProfile={updateUserInfo}/>}
            />
            <Route path="/preprofile" element={<Preprofile getInfo={getInfoAboutUser} />}
            />
            <Route path="/signup" element={<Services/>}
            />
            <Route path="/salons" element={<Salons/>}
            />
            <Route path="/aboutus" element={<About/>}
            />
          </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
