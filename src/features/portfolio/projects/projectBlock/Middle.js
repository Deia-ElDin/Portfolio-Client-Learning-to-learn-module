import { useSelector, useDispatch } from 'react-redux';
import {
  selectFeaturesSwitchBtn,
  setFeaturesSwitchBtn,
} from '../../portfolioSlice';
import SwitchBtn from '../../../helpers/components/form/btn/SwitchBtn';
import Header from './dependencies/Header';
import Table from './dependencies/Table';
import Responsive from './dependencies/Responsive';
import TestedWith from './dependencies/TestedWith';

const Middle = () => {
  const switchBtnState = useSelector(selectFeaturesSwitchBtn);
  const dispatch = useDispatch();

  const switchBtn = (
    <SwitchBtn
      name="features"
      labelName="Features"
      checked={switchBtnState}
      handleChange={() => dispatch(setFeaturesSwitchBtn(!switchBtnState))}
    />
  );

  const featuresSection = (
    <section className="features-section" data-testid="features-container">
      <Table />
      <Responsive />
      <TestedWith />
    </section>
  );

  const features = (
    <section className="features">
      {switchBtn}
      {switchBtnState && featuresSection}
    </section>
  );

  return (
    <section className="middle-section" aria-label="Project features">
      <Header />
      {features}
    </section>
  );
};

export default Middle;
