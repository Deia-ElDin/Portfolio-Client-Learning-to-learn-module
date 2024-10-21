import { useState, useRef } from 'react';
import { contactFormInitialState } from '../helpers/functions/handleInitialState';
import emailjs from 'emailjs-com';
import GeneralBtn from '../helpers/components/form/btn/GeneralBtn';

const RightContactMe = () => {
  const [formInputs, setFormInputs] = useState(contactFormInitialState);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_4ybpj9s',
      'template_le989zr',
      form.current,
      'RfEcYZx21qNfEcb_B'
    );
    setFormInputs(contactFormInitialState);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section className="right-contact">
      <form onSubmit={sendEmail} ref={form} aria-label="Contact me form">
        <fieldset className="person-details">
          <label htmlFor="name" className="off-screen">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            name="name"
            required
            value={formInputs.name}
            onChange={handleChange}
          />
          <label htmlFor="email" className="off-screen">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            name="email"
            required
            value={formInputs.email}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="subject">
          <label htmlFor="subject" className="off-screen">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            name="subject"
            required
            value={formInputs.subject}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="message">
          <label htmlFor="message" className="off-screen">
            Message:
          </label>
          <textarea
            name="message"
            placeholder="Message"
            id="message"
            cols="30"
            rows="10"
            required
            value={formInputs.message}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        <GeneralBtn btnName="Say Hello" />
      </form>
    </section>
  );
};

export default RightContactMe;
