import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContactsData, selectMediasData } from './contactMeSlice';
import ContactBlock from './blocks/ContactBlock';
import MediasBlock from './blocks/MediasBlock';

const LeftContactMe = () => {
  const [renderContacts, setRenderContacts] = useState([]);
  const [renderMedias, setRenderMedias] = useState([]);

  const contactsData = useSelector(selectContactsData);
  const mediasData = useSelector(selectMediasData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (contactsData && contactsData.length > 0) {
      const contactsList = contactsData.map((contact) => {
        const { _id, name, svgLink, info } = contact;

        return (
          <ContactBlock
            key={_id}
            id={_id}
            name={name}
            svgLink={svgLink}
            info={info}
          />
        );
      });

      setRenderContacts(contactsList);
    }

    if (mediasData && mediasData.length > 0) {
      const mediasList = mediasData.map((contact) => {
        const { _id, name, svgLink, link } = contact;

        return (
          <MediasBlock
            key={_id}
            id={_id}
            name={name}
            svgLink={svgLink}
            link={link}
          />
        );
      });

      setRenderMedias(mediasList);
    }
  }, [contactsData, mediasData, dispatch]);

  return (
    <section className="left-contact">
      <section className="contact-list" aria-label="My contacts">
        {renderContacts}
      </section>
      <section className="btns-container" aria-label="My social medias">
        {renderMedias}
      </section>
    </section>
  );
};

export default LeftContactMe;
