import { useState, useEffect } from 'react';
import { disableInitialState } from '../../functions/handleInitialState';
import { convertQueryToDisplayQuery } from '../../functions/handleQueries';
import PropTypes from 'prop-types';

const MultiInputs = (props) => {
  const {
    checkBoxName,
    checked,
    handleDisplay,
    labelName,
    target,
    data,
    type,
    inputValues,
    setInputValues,
    setQueries,
    setDisplayQueries,
    testId,
  } = props;

  const [disabledInputs, setDisabledInputs] = useState(disableInitialState);

  useEffect(() => {
    let targetString = '';
    const displayQuery = convertQueryToDisplayQuery(target);

    if (target === 'rating' || target === 'duration') {
      inputValues.forEach((item) => {
        const letter = target === 'rating' ? 'r' : 'd';
        if (item.value) {
          targetString += `${letter}${item.inputName}${item.value},`;
        }
      });

      setQueries((prev) => ({
        ...prev,
        [target]: targetString ? targetString.slice(0, -1) : '',
      }));

      setDisplayQueries((prev) => ({
        ...prev,
        [displayQuery]: targetString ? true : false,
      }));

      handleDisabled();
    } else {
      inputValues.forEach((item) => {
        if (item.checked) targetString += `"${item.inputName}", `;
      });

      setQueries((prev) => ({
        ...prev,
        [target]: targetString
          ? `[${targetString.substring(0, targetString.length - 2)}]`
          : '',
      }));

      setDisplayQueries((prev) => ({
        ...prev,
        [displayQuery]: targetString ? true : false,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues, setQueries, setDisplayQueries, target]);

  const handleChange = (e) => {
    let { name, type, value, checked } = e.target;

    const ratingCondition =
      name.includes('>') || name.includes('<') || name.includes('=')
        ? true
        : false;

    if (target === 'rating' && ratingCondition) {
      if (value > 5) value = 5;
      if (value < 0) value = '';
      if (name === '>' && value >= 5) value = 4.9;
    }

    setInputValues((prev) => {
      return prev.map((item) => {
        if (item.inputName === name) {
          if (type === 'number') return { ...item, value: value };
          else return { ...item, checked: checked };
        } else return item;
      });
    });
  };

  const handleDisabled = () => {
    const disableArray = [
      ['>', '='],
      ['>=', '='],
      ['>=', '>', '<', '<='],
      ['=', '<='],
      ['=', '<'],
    ];

    let arr1 = [];
    let arr2 = [];
    inputValues.map((symbol, index) => {
      if (symbol.value && index <= 2) {
        arr1 = disableArray[index];
      } else if (symbol.value && index > 2) {
        arr2 = disableArray[index];
      }
      return null;
    });

    let activeArray = [];
    if (!inputValues[0].value && !inputValues[1].value) {
      activeArray = ['>=', '>'];
    }

    if (!inputValues[3].value && !inputValues[4].value) {
      activeArray = ['<', '<='];
    }

    if (arr1.length !== 0 || arr2.length !== 0) {
      setDisabledInputs((prev) => {
        return prev.map((item) => {
          if (arr1.includes(item.inputName) || arr2.includes(item.inputName)) {
            return { ...item, value: true };
          } else if (activeArray.includes(item.inputName)) {
            return { ...item, value: false };
          } else return item;
        });
      });
    } else setDisabledInputs(disableInitialState);
  };

  const numberInput = (name, index) => (
    <input
      type="number"
      name={name}
      id={name}
      value={inputValues[index].value}
      onChange={handleChange}
      disabled={disabledInputs[index].value}
    />
  );

  const checkBoxInput = (name, index) => (
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={inputValues[index]?.checked ? inputValues[index].checked : false}
      onChange={handleChange}
    />
  );

  const multiInputs = data.map((item, index) => {
    return (
      <article
        className={`multi-inputs-article ${checked ? 'on' : 'off'}`}
        key={item.name}
      >
        {target === 'rating' || target === 'duration' ? (
          <label className="symbols">{item.name}</label>
        ) : (
          <label htmlFor={item.name}>
            <img src={item.svgLink} alt={item.name} />
          </label>
        )}

        {type === 'number'
          ? numberInput(item.name, index)
          : checkBoxInput(item.name, index)}
      </article>
    );
  });

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

      <section className="multi-inputs-section" data-testid={testId}>
        {multiInputs}
      </section>
    </fieldset>
  );
};

MultiInputs.propTypes = {
  checkBoxName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  inputValues: PropTypes.array.isRequired,
  setInputValues: PropTypes.func.isRequired,
  setQueries: PropTypes.func.isRequired,
  setDisplayQueries: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default MultiInputs;
