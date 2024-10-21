import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../../../../../context/ProjectContext';

const MoreDetailsBtn = () => {
  const { _id, activateDetailsBtn, uiPackageJson, serverPackageJson } =
    useContext(ProjectContext);

  const displayCondition = uiPackageJson || serverPackageJson;

  return (
    activateDetailsBtn &&
    displayCondition && (
      <Link to={`/portfolio/${_id}`}>
        <button className="more-details-btn">Package Json</button>
      </Link>
    )
  );
};

export default MoreDetailsBtn;
