import EditBtn from '../../helpers/components/form/btn/EditBtn';
import PropTypes from 'prop-types';

const ContactBlock = ({ id, name, svgLink, info }) => {
  return (
    <article className="contact-block">
      <EditBtn id="contacts" editId={id} editTarget={name} />
      <div className="header">
        <img src={svgLink} alt={name} />
        <p className="name">{name}</p>
      </div>
      <p>{info}</p>
    </article>
  );
};

ContactBlock.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  svgLink: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ContactBlock;
