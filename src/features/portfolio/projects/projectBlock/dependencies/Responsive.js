import { useContext } from 'react';
import { ProjectContext } from '../../../../../context/ProjectContext';
import {
  checkedSvg,
  uncheckedSvg,
} from '../../../../helpers/srcs/handleImgsSrc';

const Responsive = () => {
  const { responsive } = useContext(ProjectContext);

  return (
    <section className="responsive">
      <h4>Responsive</h4>
      <figure>
        <img
          src={responsive ? checkedSvg : uncheckedSvg}
          alt={responsive ? 'checked' : 'unchecked'}
        />
      </figure>
    </section>
  );
};

export default Responsive;
