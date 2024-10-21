import { useSelector } from 'react-redux';
import { selectContactForm, selectMediaForm } from '../controls/controlsSlice';
import Title from '../helpers/components/title/Title';
import LeftContactMe from './LeftContactMe';
import RightContactMe from './RightContactMe';
import ContactForm from './forms/ContactForm';
import MediaForm from './forms/MediaForm';

const ContactMe = () => {
  const displayContactForm = useSelector(selectContactForm);
  const displayMediaForm = useSelector(selectMediaForm);

  return (
    <section className="main-section contact-me" aria-label="Contact me">
      <Title mainTitle="CONTACT" spanText="ME" subTitle="MY CONTACTS" />
      <section className="contact-container">
        <LeftContactMe />
        <RightContactMe />
        {displayContactForm && <ContactForm />}
        {displayMediaForm && <MediaForm />}
      </section>
    </section>
  );
};

export default ContactMe;
