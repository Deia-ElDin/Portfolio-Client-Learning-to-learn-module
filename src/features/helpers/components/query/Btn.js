import { useState, useEffect } from 'react';
import { convertQueryToDisplayQuery } from '../../functions/handleQueries';
import PropTypes from 'prop-types';

const Btn = (props) => {
  const {
    checkBoxName,
    checked,
    handleDisplay,
    labelName,
    btnObj,
    setQueriesBtns,
    setQueries,
    setDisplayQueries,
    testId,
  } = props;

  const [btn, setBtn] = useState({});

  useEffect(() => {
    const btnNames = 'True';
    const btnId = Object.keys(btnObj)[0];
    const btnClass = Object.values(btnObj)[0];

    setBtn({ name: btnNames, id: btnId, class: btnClass });
  }, [btnObj]);

  const handleQueryBtnsClick = (e) => {
    const { className } = e.target;
    const activeBtnId = btn.id;

    let isActive;
    let targetObj;

    const handleEditObj = () => {
      if (!className.includes('active')) {
        isActive = true;
        return { [activeBtnId]: 'active' };
      } else {
        isActive = false;
        return { [activeBtnId]: 'normal' };
      }
    };

    if (activeBtnId.includes('frontEnd')) targetObj = 'frontEnd';
    else if (activeBtnId.includes('backEnd')) targetObj = 'backEnd';
    else if (activeBtnId.includes('fullStack')) targetObj = 'fullStack';

    const editObj = handleEditObj();
    const displayTarget = convertQueryToDisplayQuery(targetObj);

    setQueriesBtns((prev) => ({ ...prev, [targetObj]: editObj }));

    setQueries((prev) => ({
      ...prev,
      [targetObj]: isActive ? 'true' : '',
    }));

    setDisplayQueries((prev) => ({
      ...prev,
      [displayTarget]: isActive ? true : false,
    }));
  };

  return (
    <fieldset className="query-fieldset">
      <input
        className={checked ? 'on' : 'off'}
        type="checkbox"
        id={checkBoxName}
        name={checkBoxName}
        checked={checked}
        onChange={handleDisplay}
      />
      <label htmlFor={checkBoxName} className={checked ? 'on' : 'off'}>
        {labelName}
      </label>

      <section className="btn-section" data-testid={testId}>
        <button
          className={`${btn.class} ${checked ? 'on' : 'off'}`}
          type="button"
          id={btn.id}
          onClick={handleQueryBtnsClick}
        >
          {btn.name}
        </button>
      </section>
    </fieldset>
  );
};

Btn.propTypes = {
  checkBoxName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  btnObj: PropTypes.object.isRequired,
  setQueriesBtns: PropTypes.func.isRequired,
  setQueries: PropTypes.func.isRequired,
  setDisplayQueries: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Btn;
