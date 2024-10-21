import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProjectContext } from '../../../../context/ProjectContext';
import {
  selectDurationSwitchBtn,
  setDurationSwitchBtn,
} from '../../portfolioSlice';
import SwitchBtn from '../../../helpers/components/form/btn/SwitchBtn';

const Bottom = () => {
  const { startingDate, finishingDate, duration } = useContext(ProjectContext);

  const switchBtnState = useSelector(selectDurationSwitchBtn);
  const dispatch = useDispatch();

  const switchBtn = (
    <SwitchBtn
      name="dates"
      labelName="Dates"
      checked={switchBtnState}
      handleChange={() => dispatch(setDurationSwitchBtn(!switchBtnState))}
    />
  );

  const days = `${duration} ${duration > 1 ? 'Days' : 'Day'}`;

  const datesSection = (
    <section className="dates-section" data-testid="dates-container">
      <article className="date-block">
        <h4>Starting Date:</h4>
        <p>{startingDate}</p>
      </article>
      <article className="date-block">
        <h4>Finishing Date:</h4>
        <p>{finishingDate}</p>
      </article>
      <article className="date-block">
        <h4>Duration:</h4>
        <p className="duration">{days}</p>
      </article>
    </section>
  );

  return (
    <section className="bottom-section" aria-label="Dates">
      {switchBtn}
      {switchBtnState && datesSection}
    </section>
  );
};

export default Bottom;
