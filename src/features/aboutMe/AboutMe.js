import Title from "../helpers/components/title/Title";
import Qualifications from "./jobs/Qualifications";
import Infos from "./infos/Infos";
import Skills from "./skills/Skills";
import Jobs from "./jobs/Jobs";
import Achievements from "./jobs/Achievements";
import Reflection from "./jobs/Reflection";

const AboutMe = () => {
  return (
    <section className="main-section about-me" aria-label="About me">
      <Title mainTitle="ABOUT" spanText="ME" subTitle="MY STATS" />
      <Infos />
      <hr />
      <Qualifications />
      <hr />
      <Skills />
      <hr />
      <Jobs />
      <hr />
      <Achievements />
      <hr />
      <Reflection />
    </section>
  );
};

export default AboutMe;
