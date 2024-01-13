import './App.css';
import MainPage from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import MyAppointments from './components/MyAppointments/MyAppointments';
import Services from './components/Services/Services';
import Salons from './components/Salons/Salons';
import Preprofile from './components/Preprofile/Preprofile';
import About from './components/About/About';
import Api from './utils/Api'
import Nails from './components/Nails/Nails';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "./context/CurrentUserContext";
import { use } from 'i18next';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [regions, setRegions] = useState([]);
  //console.log("user", currentUser);
  const [version, setVersion] = useState('');
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
        //console.log('идет с сервера', clientData);
        setCurrentUser(clientData);
      })
      .catch((error) => console.log(error));
  }

  function getRegions() {
    api
      .getAllRegions()
      .then((regions) => {
        console.log('регионы', regions);
        setRegions(regions);
      })
      .catch((error) => console.log(error));
  }


  function updateUserInfo(formData) {
    console.log("app.js", formData);
    api.editProfile(formData)
      .then((user) => {
        //console.log('POST : идет с сервера ', user);
        setCurrentUser(user);
      })
      .catch((error) => console.log(error));
  }

  function getVersionApp() {
    api
      .getVersion()
      .then((version) => {
        //console.log('version', version);
        setVersion(version);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getVersionApp();
  }, []);


  //   useEffect(() => {
  //     // Сохраняем currentUser в localStorage
  //     localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path="/" element={<MainPage />}
          />
          <Route path="/mynotes" element={<MyAppointments />} />

          {/* <Route path="/profile" element={<Profile onEditProfile={updateUserInfo}/>}
        /> */}
          <Route path="/preprofile" element={<Preprofile allRegions={regions} getInfo={getInfoAboutUser} getRegions={getRegions} onEditProfile={updateUserInfo} />}
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
