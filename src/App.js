import { Routes, Route } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";
import Layout from "./features/layout/Layout";
import Login from "./features/auth/Login";
import Home from "./features/home/Home";
import AboutMe from "./features/aboutMe/AboutMe";
import Portfolio from "./features/portfolio/Portfolio ";
import Project from "./features/portfolio/project/Project";
import ContactMe from "./features/contactMe/ContactMe";
import NotFound from "./features/notFound/NotFound";
import Logout from "./features/auth/Logout";
import "./sass/App.css";

function App() {
  useFetchData();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="aboutme" element={<AboutMe />} />
        <Route path="portfolio">
          <Route index element={<Portfolio />} />
          <Route path=":id" element={<Project />} />
        </Route>
        <Route path="contactme" element={<ContactMe />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
