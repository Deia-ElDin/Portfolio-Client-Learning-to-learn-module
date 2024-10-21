import { useEffect } from 'react';
import PropTypes from 'prop-types';

const MultiInputs = (props) => {
  const {
    target,
    data,
    type,
    inputValues,
    setInputValues,
    setTheState,
    inputErr,
  } = props;

  useEffect(() => {
    let stringObj = '';

    inputValues.forEach((item) => {
      if (item.value) stringObj += `"${item.inputName}": ${item.value}, `;
      if (item.checked) stringObj += `"${item.inputName}": ${item.checked}, `;
    });

    if (stringObj) {
      const targetValue = `{${stringObj.substring(0, stringObj.length - 2)}}`;
      setTheState((prev) => ({ ...prev, [target]: targetValue }));
    }
  }, [inputValues, setTheState, target]);

  const handleChange = (e) => {
    let { name, type, value, checked } = e.target;

    setInputValues((prev) => {
      return prev.map((item) => {
        if (item.inputName === name) {
          if (type === 'number') return { ...item, value: value };
          else return { ...item, checked: checked };
        } else return item;
      });
    });
  };

  const numberInput = (name, index) => (
    <input
      className={inputErr ? 'multi-inputs-err' : null}
      type="number"
      name={name}
      id={name}
      value={inputValues[index].value}
      onChange={handleChange}
    />
  );

  const checkBoxInput = (name, index) => (
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={inputValues[index].checked}
      onChange={handleChange}
    />
  );

  const renderTheComp = data.map((item, index) => {
    return (
      <article
        className="multi-inputs-article"
        key={item.name}
        data-testid="multi-inputs"
      >
        <label htmlFor={item.name}>
          <img src={item.svgLink} alt={item.name} />
        </label>
        {type === 'number'
          ? numberInput(item.name, index)
          : checkBoxInput(item.name, index)}
      </article>
    );
  });

  return <>{renderTheComp}</>;
};

MultiInputs.propTypes = {
  target: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  inputValues: PropTypes.array.isRequired,
  setInputValues: PropTypes.func.isRequired,
  setTheState: PropTypes.func.isRequired,
  inputErr: PropTypes.bool,
};

export default MultiInputs;
