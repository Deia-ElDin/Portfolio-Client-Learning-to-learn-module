import SwitchBtn from './btn/SwitchBtn';
import PropTypes from 'prop-types';

const SwitchBtns = ({ switchBtns, handleSwitchBtnsChange }) => {
  return (
    <fieldset className="switch-btns-fieldset">
      <SwitchBtn
        name="img"
        labelName="Image"
        checked={switchBtns.img}
        handleChange={handleSwitchBtnsChange}
      />
      <SwitchBtn
        name="tech"
        labelName="Technologies"
        checked={switchBtns.tech}
        handleChange={handleSwitchBtnsChange}
      />
      <SwitchBtn
        name="ui"
        labelName="UI"
        checked={switchBtns.ui}
        handleChange={handleSwitchBtnsChange}
      />
      <SwitchBtn
        name="server"
        labelName="Server"
        checked={switchBtns.server}
        handleChange={handleSwitchBtnsChange}
      />
      <SwitchBtn
        name="test"
        labelName="Tested With"
        checked={switchBtns.test}
        handleChange={handleSwitchBtnsChange}
      />
    </fieldset>
  );
};

SwitchBtns.propTypes = {
  switchBtns: PropTypes.object.isRequired,
  handleSwitchBtnsChange: PropTypes.func.isRequired,
};

export default SwitchBtns;
