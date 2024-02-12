import './App.css';
import MainPage from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import MyAppointments from './components/MyAppointments/MyAppointments';
import Services from './components/Services/Services';
import Salons from './components/Salons/Salons';
import UserProfile from './components/UserProfile/UserProfile';
import About from './components/About/About';
import Api from './utils/Api'
import Nails from './components/Nails/Nails';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [regions, setRegions] = useState([]);
  const [version, setVersion] = useState('');

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  function getInfoAboutUser() {
    return api.getUserInfo()
  }

  function getRegions() {
    return api.getAllRegions();
  }

  useEffect(() => {
    Promise.all([getInfoAboutUser(), getRegions()])
      .then(([clientData, regionsData]) => {
        setCurrentUser(clientData);
        setRegions(regionsData);
      })
      .catch((error) => console.log(error));
  }, []);


  async function updateUserInfo(inputData) {
    try {
      const user = await api.editProfile(inputData);
      console.log('POST : идет с сервера ', user);
      setCurrentUser(user);
    } catch (error) {
      return console.log(error);
    }
  }

  function getVersionApp() {
    api
      .getVersion()
      .then((version) => {
        setVersion(version);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getVersionApp();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path="/" element={<MainPage />}
          />
          <Route path="/mynotes" element={<MyAppointments />} />

          <Route path="/preprofile" element={<UserProfile allRegions={regions} onEditProfile={updateUserInfo} />}
          />
          <Route path="/appointment" element={<Services />}
          />
          <Route path="/salons" element={<Salons />}
          />
          <Route path="/nails" element={<Nails />}
          />
          <Route path="/aboutus" element={<About version={version} />}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
