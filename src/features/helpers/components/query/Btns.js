import { useState, useEffect } from 'react';
import { convertQueryToDisplayQuery } from '../../functions/handleQueries';
import PropTypes from 'prop-types';

const Btns = ({
  checkBoxName,
  checked,
  handleDisplay,
  labelName,
  btnObj,
  setQueriesBtns,
  setQueries,
  setDisplayQueries,
  testId,
}) => {
  const [firstBtn, setFirstBtn] = useState({});
  const [secondBtn, setSecondBtn] = useState({});

  useEffect(() => {
    const btnNames = Object.keys(btnObj).map((btn) => {
      if (btn.includes('True')) return 'True';
      else if (btn.includes('False')) return 'False';
      else return `${btn[0].toUpperCase()}${btn.substring(1)}`;
    });
    const btnsId = Object.keys(btnObj);
    const btnsClass = Object.values(btnObj);

    setFirstBtn({ name: btnNames[0], id: btnsId[0], class: btnsClass[0] });
    setSecondBtn({ name: btnNames[1], id: btnsId[1], class: btnsClass[1] });
  }, [btnObj]);

  const handleQueryBtnsClick = (e) => {
    const { id, className } = e.target;
    const activeBtnId = firstBtn.id === id ? firstBtn.id : secondBtn.id;
    const inactiveBtnId =
      activeBtnId === firstBtn.id ? secondBtn.id : firstBtn.id;

    let isAnyActiveBtn;
    let targetObj;
    let editObj;

    const handleEditObj = (btnName) => {
      // at the moment the btn pressed, it didn't have an active state
      // that's why we are checking (!className.includes('active'))
      // which means it wasn't active before we click it
      // don't try to log the values because you will get the previous readings
      // check the dev tool for current readings
      if (!className.includes('active')) {
        // therefore we have an active btn
        isAnyActiveBtn = true;
        return activeBtnId === btnName
          ? { [activeBtnId]: 'active', [inactiveBtnId]: 'normal' }
          : { [inactiveBtnId]: 'normal', [activeBtnId]: 'active' };
      } else {
        isAnyActiveBtn = false;
        return activeBtnId === btnName
          ? { [activeBtnId]: 'normal', [inactiveBtnId]: 'normal' }
          : { [inactiveBtnId]: 'normal', [activeBtnId]: 'normal' };
      }
    };

    const handleQueryValue = (activeBtnId) => {
      if (activeBtnId.includes('True')) return 'true';
      else if (activeBtnId.includes('False')) return 'false';
      else return activeBtnId;
    };

    if (activeBtnId.includes('commercial')) {
      targetObj = 'commercial';
      editObj = handleEditObj('commercialTrueBtn');
    } else if (activeBtnId.includes('responsive')) {
      targetObj = 'responsive';
      editObj = handleEditObj('responsiveTrueBtn');
    } else if (activeBtnId.includes('frontEnd')) {
      targetObj = 'frontEnd';
      editObj = handleEditObj('frontEndTrueBtn');
    } else if (activeBtnId.includes('backEnd')) {
      targetObj = 'backEnd';
      editObj = handleEditObj('backEndTrueBtn');
    } else if (activeBtnId.includes('fullStack')) {
      targetObj = 'fullStack';
      editObj = handleEditObj('fullStackTrueBtn');
    }

    const displayTarget = convertQueryToDisplayQuery(targetObj);
    const queryValue = handleQueryValue(activeBtnId);

    setQueriesBtns((prev) => ({ ...prev, [targetObj]: editObj }));

    setQueries((prev) => ({
      ...prev,
      [targetObj]: isAnyActiveBtn ? queryValue : '',
    }));

    setDisplayQueries((prev) => ({
      ...prev,
      [displayTarget]: isAnyActiveBtn ? true : false,
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

      <section className="btns-section" data-testid={testId}>
        <button
          className={`${firstBtn.class} ${checked ? 'on' : 'off'}`}
          type="button"
          id={firstBtn.id}
          onClick={handleQueryBtnsClick}
        >
          {firstBtn.name}
        </button>
        <button
          className={`${secondBtn.class} ${checked ? 'on' : 'off'}`}
          type="button"
          id={secondBtn.id}
          onClick={handleQueryBtnsClick}
        >
          {secondBtn.name}
        </button>
      </section>
    </fieldset>
  );
};

Btns.propTypes = {
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

export default Btns;
