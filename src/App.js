import './App.css';
import MainPage from './components/MainMenu/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import MyAppointments from './components/MainMenu/MyAppointments/MyAppointments';
import Salons from './components/SalonsFolder/Salons/Salons';
import SalonCard from './components/SalonsFolder/SalonCard/SalonCard';
import UserProfile from './components/MainMenu/UserProfile/UserProfile';
import About from './components/MainMenu/About/About';
import Api from './utils/Api';
import SalonSchedule from './components/SalonsFolder/SalonSchedule/SalonSchedule';
import SalonsAfterFilter from './components/SalonsFolder/SalonsAfterFilter/SalonsAfterFilter';
import Categories from './components/SalonsFolder/Categories/Categories';
import Reviews from './components/SalonsFolder/Reviews/Reviews';
import PriceList from './components/SalonsFolder/PriceList/PriceList';
import HoursSchedule from './components/SalonsFolder/HoursSchedule/HoursSchedule';
import NewAppointment from './components/MainMenu/NewAppointment/NewAppointment';
import Header from './components/MainMenu/Header/Header';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { CurrentSalonContext } from "./context/CurrentSalonContext";
import AppointmentCalendar from './components/SalonsFolder/AppointmentCalendar/AppointmentCalendar';
import AppointmentConfirmation from './components/SalonsFolder/AppointmentConfirmation/AppointmentConfirmation';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [currentSalon, setCurrentSalon] = useState({});
  const [regions, setRegions] = useState([]);
  const [salons, setSalons] = useState([]);
  const [salonInfo, setSalonInfo] = useState(null);

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


  useEffect(() => {
    if (currentUser && currentUser.regionId) {
      getSalonsByRegionForCurrentUser();
    }
  }, [currentUser]);

  function getSalonsByRegionForCurrentUser() {
    return api
      .getAllSalonsInRegion(currentUser.regionId)
      .then((salons) => {
        setSalons(salons);
        salons.forEach(salon => {
          getSalonDetails(salon.salonId);
        });

      })
      .catch((error) => console.log(error))
  }

  async function getSalonDetails(salonId) {
    try {
      const salonInfo = await api.getSalonInfo(salonId);
      setSalonInfo(salonInfo);
    } catch (error) {
      console.error("Error fetching salon info:", error);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentSalonContext.Provider value={salons}>
        <div className='App'>
          {['/profile'].includes(location.pathname) ? <UserProfile allRegions={regions} onEditProfile={updateUserInfo} /> : (
            <>
              <Header />
              <MainPage />
              <Routes>
                <Route path="/" element={<NewAppointment />} />

                <Route path="/mynotes" element={<MyAppointments />} />

                <Route path="/appointment/:categoryId" element={<Categories />} />

                <Route path="/salons" element={<Salons />} />

                <Route path="/salonsafterfilter" element={<SalonsAfterFilter />} />

                <Route path="/calendar/:salonId" element={<SalonSchedule />} />

                <Route path="/schedule/:scheduleday" element={<HoursSchedule />} />

                <Route path="/appointmentcalendar" element={<AppointmentCalendar />} />

                <Route path="/appointmentconfirmation" element={<AppointmentConfirmation />} />

                <Route path="/reviews/:salonId" element={<Reviews />} />

                <Route path="/pricelist/:salonId" element={<PriceList />} />

                <Route path="/salons/:salonId" element={<SalonCard />} />

                <Route path="/aboutus" element={<About />} />
              </Routes>
            </>
          )}
        </div>
      </CurrentSalonContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;
