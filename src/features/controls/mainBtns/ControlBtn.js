import {
  setClass,
  setDisabled,
  setTitle,
} from '../../helpers/functions/handleControls';
import DetailSubs from './subBtns/DetailSubs';
import ProjectSubs from './subBtns/ProjectSubs';
import ContactSubs from './subBtns/ContactSubs';
import PropTypes from 'prop-types';

const ControlBtn = (props) => {
  const {
    btnName,
    btnIcon,
    activeBtn,
    username,
    displayLoginForm,
    activateDetailSubs,
    activateProjectSubs,
    activateContactSubs,
    handleClick,
  } = props;

  return (
    <div className="control" key={btnName}>
      <button
        id={btnName}
        className={setClass({ btnName, activeBtn, username, displayLoginForm })}
        title={setTitle(btnName)}
        aria-label={setTitle(btnName)}
        disabled={setDisabled({ username, btnName })}
        onClick={() => handleClick(btnName)}
      >
        {btnIcon}
        {btnName === 'details' && activateDetailSubs && <DetailSubs />}
        {btnName === 'project' && activateProjectSubs && <ProjectSubs />}
        {btnName === 'contacts' && activateContactSubs && <ContactSubs />}
      </button>
    </div>
  );
};

ControlBtn.propTypes = {
  btnName: PropTypes.string.isRequired,
  btnIcon: PropTypes.element.isRequired,
  activeBtn: PropTypes.string.isRequired,
  username: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  displayLoginForm: PropTypes.bool,
  activateDetailSubs: PropTypes.bool,
  activateProjectSubs: PropTypes.bool,
  activateContactSubs: PropTypes.bool,
};

export default ControlBtn;
