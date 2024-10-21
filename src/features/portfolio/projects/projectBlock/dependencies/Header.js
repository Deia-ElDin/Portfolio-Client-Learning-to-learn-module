import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../../../../../context/ProjectContext';
import AnchorButton from './AnchorButton';
import Rating from './Rating';

const Header = () => {
  const {
    _id,
    projectName,
    ui,
    uiLiveDemoLink,
    uiDownloadLink,
    server,
    serverLiveDemoLink,
    serverDownloadLink,
    activateHeaderLink,
  } = useContext(ProjectContext);

  const projectTitle = () => {
    const activeHeader = (
      <Link to={`/portfolio/${_id}`}>
        <h3 className="project-name">{projectName}</h3>
      </Link>
    );

    const inActiveHeader = <h3 className="project-name">{projectName}</h3>;

    return activateHeaderLink ? activeHeader : inActiveHeader;
  };

  const frontEndBtns = (
    <section className="btns">
      {uiLiveDemoLink && (
        <AnchorButton link={uiLiveDemoLink} ariaLabel="Ui live demo" />
      )}
      {uiDownloadLink && (
        <AnchorButton link={uiDownloadLink} ariaLabel="Ui download" />
      )}
    </section>
  );

  const backEndBtns = (
    <section className="btns">
      {serverLiveDemoLink && (
        <AnchorButton link={serverLiveDemoLink} ariaLabel="Server live demo" />
      )}
      {serverDownloadLink && (
        <AnchorButton link={serverDownloadLink} ariaLabel="Server download" />
      )}
    </section>
  );

  const fullStackBtns = (
    <section className="full-stack-btns">
      <article className="ui-article">
        <h4>UI</h4>
        {frontEndBtns}
      </article>
      <article className="server-article">
        <h4>Server</h4>
        {backEndBtns}
      </article>
    </section>
  );

  const frontEnd = (
    <section className="front-end">
      <article className="header">
        {projectTitle()}
        {ui && frontEndBtns}
      </article>
      <Rating />
    </section>
  );

  const backEnd = (
    <section className="back-end">
      <article className="header">
        {projectTitle()}
        {server && backEndBtns}
      </article>
      <Rating />
    </section>
  );

  const fullStack = (
    <section className="full-stack">
      <article className="header">
        {projectTitle()}
        <Rating />
      </article>
      {ui && server && fullStackBtns}
    </section>
  );

  const noStack = (
    <section className="no-stack">
      <article className="header">{projectTitle()}</article>
      <Rating />
    </section>
  );

  const renderStack = () => {
    if (ui && server) return fullStack;
    else if (ui) return frontEnd;
    else if (server) return backEnd;
    else return noStack;
  };

  return renderStack();
};

export default Header;
