import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ProjectContext } from '../../../../../context/ProjectContext';
import { selectSkillsData } from '../../../../aboutMe/aboutMeSlice';
import { tableBtnsInitialState } from '../../../../helpers/functions/handleInitialState';
import { checkedSvg } from '../../../../helpers/srcs/handleImgsSrc';

const Table = () => {
  const { technologies, sumCodeLines, uiPackageJson, serverPackageJson } =
    useContext(ProjectContext);
  const [btns, setBtns] = useState(tableBtnsInitialState);
  const [renderBtns, setRenderBtns] = useState(false);
  const [tableBody, setTableBody] = useState([]);
  const [tableFooter, setTableFooter] = useState([]);
  const skillsData = useSelector(selectSkillsData);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (technologies || uiPackageJson || serverPackageJson) {
      let count = 0;

      const objsArray = [technologies, uiPackageJson, serverPackageJson];

      objsArray.forEach((tech) => {
        if (tech) count += 1;
      });

      setRenderBtns(pathname !== '/portfolio' && count > 1 ? true : false);
    }
  }, [technologies, uiPackageJson, serverPackageJson, pathname]);

  useEffect(() => {
    if (skillsData.length > 0) {
      if (technologies && btns.tech) {
        const zeroTechArray = [];

        const technologiesObj = JSON.parse(technologies);

        const body = Object.entries(technologiesObj).map(
          ([techName, codeLines]) => {
            const svgLink = skillsData.find(
              (skill) => skill.name === techName
            ).svgLink;

            const svgLinkImg = (
              <img key={svgLink} src={svgLink} alt={techName} />
            );

            if (codeLines === 0) {
              zeroTechArray.push(svgLinkImg);
              return null;
            } else {
              const percentage =
                Math.round(((codeLines * 100) / sumCodeLines) * 10) / 10;
              return (
                <tr key={techName} className="tech-tr">
                  <td className="tech-td">
                    <article className="tech-article">
                      <figure>
                        <img src={svgLink} alt={techName} />
                      </figure>
                      <p className="tech-name">{techName}</p>
                    </article>
                  </td>
                  <td className="code-lines-td">{codeLines}</td>
                  <td className="percentage-td">{`${percentage} %`}</td>
                </tr>
              );
            }
          }
        );

        if (zeroTechArray.length >= 1) {
          body.push(
            <tr key="zero-tech-figure">
              <td>
                <figure className="zero-tech-figure">{zeroTechArray}</figure>
              </td>
              <td colSpan="2">
                {
                  <figure>
                    <img src={checkedSvg} alt="check mark" />
                  </figure>
                }
              </td>
            </tr>
          );
        }

        const footer = (
          <tr>
            <td>TOTAL</td>
            <td colSpan="2">{`${sumCodeLines} Lines`}</td>
          </tr>
        );

        setTableBody(body);
        setTableFooter(footer);
      }

      const setTheStates = (packageJsonObj) => {
        const obj = JSON.parse(packageJsonObj);
        const body = Object.entries(obj).map(([packageName, version]) => {
          return (
            <tr key={packageName}>
              <td>
                <h4>{packageName}</h4>
              </td>
              <td>{version}</td>
            </tr>
          );
        });

        setTableBody(body);
        setTableFooter([]);
      };

      if (uiPackageJson && btns.ui) setTheStates(uiPackageJson);

      if (serverPackageJson && btns.server) setTheStates(serverPackageJson);
    }
  }, [
    skillsData,
    technologies,
    sumCodeLines,
    uiPackageJson,
    serverPackageJson,
    btns,
    pathname,
  ]);

  const handleClick = (activeBtn) => {
    setBtns({
      tech: false,
      ui: false,
      server: false,
      [activeBtn]: true,
    });
  };

  const clickedBtnsStyle = {
    boxShadow: 'inset 0 2px 5px 3px white',
  };

  return (
    <section className="table-section">
      {renderBtns && (
        <section className="btns">
          {technologies && (
            <h4
              style={btns.tech ? clickedBtnsStyle : null}
              onClick={() => handleClick('tech')}
            >
              Technologies
            </h4>
          )}
          {uiPackageJson && (
            <h4
              style={btns.ui ? clickedBtnsStyle : null}
              onClick={() => handleClick('ui')}
            >
              UI
            </h4>
          )}
          {serverPackageJson && (
            <h4
              style={btns.server ? clickedBtnsStyle : null}
              onClick={() => handleClick('server')}
            >
              Server
            </h4>
          )}
        </section>
      )}

      <table className="table" data-testid="tech-table">
        <tbody>{tableBody}</tbody>
        <tfoot>{tableFooter}</tfoot>
      </table>
    </section>
  );
};

export default Table;
