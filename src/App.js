import './App.css';
import MainPage from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import MyAppointments from './components/MyAppointments/MyAppointments';
import Salons from './components/Salons/Salons';
import SalonCard from './components/SalonCard/SalonCard';
import UserProfile from './components/UserProfile/UserProfile';
import About from './components/About/About';
import Api from './utils/Api';
import MyCalendar from './components/Calendar/Calendar';
import Categories from './components/Categories/Categories';
import Reviews from './components/Reviews/Reviews';
import PriceList from './components/PriceList/PriceList';
import ScheduleDay from './components/ScheduleDay/ScheduleDay';
import NewAppointment from './components/NewAppointment/NewAppointment';
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
      await api.editProfile(inputData);
      const user = await getInfoAboutUser();
      setCurrentUser(user);
    } catch (error) {
      return console.log(error);
    }
  }

  function getCurrentVersion() {
    api
      .getVersionApp()
      .then((version) => {
        setVersion(version);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCurrentVersion();
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
          <Route path="/appointment" element={<NewAppointment />}
          />
          <Route path="/appointment/:categoryId" element={<Categories />}
          />
          <Route path="/salons" element={<Salons />}
          />
          <Route path="/calendar" element={<MyCalendar />}
          />
          <Route path="/calendar/:date" element={<ScheduleDay />} />

          <Route path="/reviews/:salonId" element={<Reviews />}
          />
          <Route path="/pricelist/:salonId" element={<PriceList />}
          />
          <Route path="/salons/:salonId" element={<SalonCard />}
          />
          <Route path="/aboutus" element={<About version={version} />}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
