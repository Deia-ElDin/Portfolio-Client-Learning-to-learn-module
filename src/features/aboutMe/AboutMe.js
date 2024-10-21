import Title from '../helpers/components/title/Title';
import Infos from './infos/Infos';
import Skills from './skills/Skills';
import Jobs from './jobs/Jobs';

const AboutMe = () => {
  return (
    <section className="main-section about-me" aria-label="About me">
      <Title mainTitle="ABOUT" spanText="ME" subTitle="MY STATS" />
      <Infos />
      <hr />
      <Skills />
      <hr />
      <Jobs />
    </section>
  );
};

export default AboutMe;
