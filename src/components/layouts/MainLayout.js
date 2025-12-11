import { Outlet } from "react-router-dom";
import Header from "../navbar/MainNavbar";
import Footer from "../footer/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This is where child routes will render */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
