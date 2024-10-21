import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSortData } from "../../../portfolio/portfolioSlice";
import {
  sortOptionsInitialState,
  sortBtnsInitialState,
} from "../../functions/handleInitialState";
import {
  ascendingSvg,
  descendingSvg,
  closeSvg,
} from "../../srcs/handleImgsSrc";
import PropTypes from "prop-types";

const SortMultiInputs = (props) => {
  const {
    checkBoxName,
    checked,
    handleDisplay,
    labelName,
    setQueries,
    setDisplayQueries,
  } = props;

  const sortData = useSelector(selectSortData);
  const [sortSelector, setSortSelector] = useState("");
  const [sortOptions, setSortOptions] = useState(
    sortOptionsInitialState(sortData)
  );
  const [sortBtns, setSortBtns] = useState(sortBtnsInitialState(sortData));
  const [sortInputErr, setSortInputErr] = useState(false);

  useEffect(() => {
    setSortInputErr(false);
    let sortString = "";

    sortOptions.forEach((option) => {
      if (option.selected) {
        sortBtns.forEach((btn) => {
          const btnId = btn.id;
          const btnState = btn.state;
          const optionId = option.id;
          const optionValue = option.value;
          const condition = btnId.includes(optionId) && btnState === "active";
          if (condition) sortString += `${optionValue}${optionId},`;
        });
      }
    });

    setQueries((prev) => ({
      ...prev,
      sort: sortString ? sortString.slice(0, -1) : "",
    }));

    setDisplayQueries((prev) => ({
      ...prev,
      displaySort: sortString ? true : false,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOptions, sortBtns, setQueries, setDisplayQueries]);

  const handleSelectorChange = (e) => {
    const { value } = e.target;

    setSortSelector(value);
    setSortOptions((prev) => {
      return prev.map((option) => {
        if (option.id === value) return { ...option, selected: true };
        else return option;
      });
    });
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    if (value === "+" || value === "-" || value === "") {
      setSortOptions((prev) => {
        return prev.map((option) => {
          if (option.id === name) return { ...option, value: value };
          else return option;
        });
      });
    } else setSortInputErr(true);
  };

  const handleClick = (e) => {
    let { id } = e.target;
    setSortBtns((prev) => {
      return prev.map((btn) => {
        if (btn.id === id) {
          let newState;
          if (btn.state === "active") newState = "normal";
          else newState = "active";
          return { ...btn, state: newState };
        } else return btn;
      });
    });
  };

  const handleRemoveBtnClick = (e) => {
    const { id } = e.target;
    setSortSelector("Select your sort item then add + or -");
    setSortOptions((prev) => {
      return prev.map((option) => {
        if (option.id === id) return { ...option, selected: false };
        else return option;
      });
    });
  };

  const selector = () => {
    const options = sortOptions.map((item) => {
      return (
        !item.selected && (
          <option key={item.name} value={item.id}>
            {item.name}
          </option>
        )
      );
    });

    const selectorElement = (
      <select
        name="selector"
        id="selector"
        onChange={handleSelectorChange}
        value={sortSelector}
      >
        <option defaultValue hidden>
          Select your sort item then add + or -
        </option>
        {options}
      </select>
    );

    return selectorElement;
  };

  const selected = () => {
    const sortElement = sortOptions.map((item, index) => {
      const sortBy = `Sort by ${item.name.toLowerCase()}`;

      return (
        item.selected && (
          <article className="sort-article" key={item.name} aria-label={sortBy}>
            <input
              type="text"
              className={`${sortInputErr ? "sort-input-err" : "sort-input"}`}
              name={item.id}
              placeholder="+ / -"
              onChange={handleInputsChange}
              value={item.value}
            />

            <button
              type="button"
              id={`${item.id}Btn`}
              className={`sort-btn ${sortBtns[index].state} `}
              onClick={handleClick}
            >
              {item.name}
              {sortBtns[index].state === "active" && (
                <img
                  src={item.value === "-" ? descendingSvg : ascendingSvg}
                  alt="arrows"
                  className="arrows"
                />
              )}
            </button>

            <button type="button" className="remove-btn" id={item.id}>
              <img
                src={closeSvg}
                alt="remove"
                id={item.id}
                onClick={handleRemoveBtnClick}
              />
            </button>
          </article>
        )
      );
    });

    return sortElement;
  };

  return (
    <fieldset className="query-fieldset">
      <input
        className={checked ? "on" : "off"}
        type="checkbox"
        id={checkBoxName}
        name={checkBoxName}
        checked={checked}
        onChange={handleDisplay}
      />
      <label htmlFor={checkBoxName} className={checked ? "on" : "off"}>
        {labelName}
      </label>

      <section className={`sort ${checked ? "on" : "off"}`} aria-label="Sort">
        <section className="selector">{selector()}</section>
        <section className="selected">{selected()}</section>
      </section>
    </fieldset>
  );
};

SortMultiInputs.propTypes = {
  checkBoxName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  setQueries: PropTypes.func.isRequired,
  setDisplayQueries: PropTypes.func.isRequired,
};

export default SortMultiInputs;
