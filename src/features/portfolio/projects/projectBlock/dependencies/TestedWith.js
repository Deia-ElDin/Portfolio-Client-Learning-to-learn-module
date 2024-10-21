import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ProjectContext } from '../../../../../context/ProjectContext';
import { selectBrowsersData } from '../../../portfolioSlice';

const TestedWith = () => {
  const { testedWith } = useContext(ProjectContext);
  const [renderTestedWith, setRenderTestedWith] = useState([]);
  const browserData = useSelector(selectBrowsersData);

  useEffect(() => {
    if (testedWith) {
      const testedWithObj = JSON.parse(testedWith);

      const testedWithList = Object.keys(testedWithObj).map((browserName) => {
        const svgLink = browserData.find(
          (browser) => browser.name === browserName
        ).svgLink;

        return <img key={browserName} src={svgLink} alt={browserName} />;
      });

      setRenderTestedWith(testedWithList);
    }
  }, [testedWith, browserData]);

  return (
    testedWith && (
      <section className="tested-with">
        <article>
          <h4>Tested With</h4>
          <figure>{renderTestedWith}</figure>
        </article>
      </section>
    )
  );
};

export default TestedWith;
