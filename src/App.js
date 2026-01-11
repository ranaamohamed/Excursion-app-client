import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/MainNavbar";
import Footer from "./components/footer/Footer";
import Contact from "./components/ContactPage/ContactUs";
import TripList from "./components/ExerTrips/TripList";
import SingleTrip from "./components/ExerTrips/SingleTrip/SingleTrip";
import WishingCart from "./components/WishingCart/WishingCart";
import MyBooking from "./components/Booking/MyBooking/MyBooking";
import Auth from "./components/AuthPage/Auth";
import MainLayout from "./components/layouts/MainLayout";
import SecLayout from "./components/layouts/SecLayout";
import OTPInput from "./components/AuthPage/OTP/OTPInput";
import BookingConfirmation from "./components/Booking/Form/BookingConfirmation";
import AllDestination from "./components/AllDestinations/AllDestination";
import CommingSoon from "./components/CommingSoon/CommingSoon";
import Profile from "./components/ProfilePage/Profile";
function App() {
  // const DefaultContainer = ({ match }) => {

  //   return (
  //     <div>
  //       <Navbar />
  //            <Route exact path="/" render={(props) => (
  //           <Home {...props} />
  //         )} />

  //     </div>
  //   );
  // };
  return (
    // <BrowserRouter>
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        {/* <Route exact path="/" render={(props) => (
            <Login {...props}/>
          )} /> */}
        {/* <Route path="/" component={DefaultContainer} /> */}
        {/* <Route path="/about" element={<Home />} /> */}
        {/* <Route exact path="/" render={(props) => <Home {...props} />} /> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/trips" element={<TripList />} />
          {/* Dynamic Route */}
          <Route path="/trips/:name" element={<SingleTrip />} />
          <Route
            path="/BookingConfirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/MyWishing" element={<WishingCart />} />
          <Route path="/MyBooking" element={<MyBooking />} />
          <Route path="/Destinations" element={<AllDestination />} />
          <Route path="/MyProfile" element={<Profile />} />
          <Route path="*" element={<CommingSoon />} />
        </Route>
        <Route element={<SecLayout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/verifyEmail" element={<OTPInput />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
    // </BrowserRouter>
  );
}

export default App;
