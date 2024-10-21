import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from './authApiSlice';
import LoadingComp from '../helpers/components/form/comp/LoadingComp';
import ErrComp from '../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../helpers/components/form/btn/GeneralBtn';

const Logout = () => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/home');
  }, [isSuccess, navigate]);

  return (
    <section className="logout">
      <div className="logout-container">
        <iframe
          src="https://giphy.com/embed/f73utlOHHNGVWSiNnw"
          title="logout"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>

      {isLoading && <LoadingComp />}
      {isError && <ErrComp errMsg={error} />}

      <GeneralBtn btnName="Log Out" handleClick={() => sendLogout()} />
    </section>
  );
};

export default Logout;
