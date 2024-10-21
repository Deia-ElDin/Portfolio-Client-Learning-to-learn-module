import { useSelector } from 'react-redux';
import { selectLoginForm, selectProfileForm } from '../controls/controlsSlice';
import Login from '../auth/Login';
import LeftHome from './LeftHome';
import RightHome from './RightHome';
import ProfileForm from './ProfileForm';

const Home = () => {
  const displayLoginForm = useSelector(selectLoginForm);
  const displayProfileForm = useSelector(selectProfileForm);

  return (
    <section className="main-section home" aria-label="Home">
      <LeftHome />
      <RightHome />
      {displayLoginForm && <Login />}
      {displayProfileForm && <ProfileForm />}
    </section>
  );
};

export default Home;
