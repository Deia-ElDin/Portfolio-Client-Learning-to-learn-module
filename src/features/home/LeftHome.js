import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { selectProfilePicData, setProfilePicId } from './homeSlice';
import LoadingComp from '../helpers/components/form/comp/LoadingComp';
import Footer from '../footer/Footer';

const LeftHome = () => {
  const [renderProfilePic, setRenderProfilePic] = useState('');
  const [baseString, setBaseString] = useState('');
  const profileData = useSelector(selectProfilePicData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileData && profileData.length > 0) {
      const { _id, profilePic } = profileData[0];
      const base64String = Buffer.from(profilePic.data.data, 'binary').toString(
        'base64'
      );

      setRenderProfilePic(profilePic);
      setBaseString(base64String);
      dispatch(setProfilePicId(_id));
    }
  }, [profileData, dispatch]);

  const profileImg = (
    <figure className="img-container">
      <img
        src={`data:${renderProfilePic.contentType};base64, ${baseString}`}
        alt="Deia"
      />
    </figure>
  );

  return (
    <section className="left-home">
      <div className="shape"></div>
      {renderProfilePic ? profileImg : <LoadingComp />}
      <Footer />
    </section>
  );
};

export default LeftHome;
