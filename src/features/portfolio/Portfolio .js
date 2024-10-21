import Title from '../helpers/components/title/Title';
import Queries from './queries/Queries';
import Projects from './projects/Projects';

const Portfolio = () => {
  return (
    <section className="main-section portfolio" aria-label="Portfolio">
      <Title mainTitle="MY" spanText="PORTFOLIO" subTitle="MY PROJECTS" />
      <Queries />
      <Projects />
    </section>
  );
};

export default Portfolio;
