import { useSelector, useDispatch } from 'react-redux';
import {
  selectFormOpacity,
  setFormOpacity,
  setUserFormOpacity,
} from '../../../../appSlice';

const OpacitySlider = () => {
  const formOpacity = useSelector(selectFormOpacity);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFormOpacity(Number(e.target.value) / 100));
    // we will use the userFormOpacity as a refrence after an err occurs
    dispatch(setUserFormOpacity(Number(e.target.value) / 100));
  };

  return (
    <section className="slider">
      <input
        type="range"
        min="1"
        max="100"
        value={formOpacity * 100}
        steps="10"
        onChange={handleChange}
      />
    </section>
  );
};

export default OpacitySlider;
