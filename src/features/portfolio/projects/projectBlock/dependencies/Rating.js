import { useContext } from 'react';
import { ProjectContext } from '../../../../../context/ProjectContext';
import {
  lightGrayStarSvg,
  lightBlueStarSvg,
  yellowStarSvg,
} from '../../../../helpers/srcs/handleImgsSrc';

const Rating = () => {
  const { rating } = useContext(ProjectContext);

  const starSrc =
    rating >= 4
      ? yellowStarSvg
      : rating >= 3
      ? lightBlueStarSvg
      : lightGrayStarSvg;

  const renderRating = () => {
    const ratingList = [];
    const ratingStar = (index) => (
      <figure className="img-block" key={index}>
        <img src={starSrc} alt="star" />
      </figure>
    );

    const floorRating = Math.floor(rating);
    const isDecimal = rating - floorRating;

    for (let i = 0; i < floorRating; i++) {
      ratingList.push(ratingStar(i));
    }

    if (isDecimal) {
      const hideStyle = {
        width: `${100 - Math.ceil(isDecimal * 100)}%`,
      };

      ratingList.push(
        <figure key={floorRating} className="decimal-block">
          <div
            className="hide"
            style={hideStyle}
            data-testid="decimal-div"
          ></div>
          <img src={starSrc} alt="star" />
        </figure>
      );
    }

    return ratingList;
  };

  return (
    <section className="rating" aria-label="Rating">
      <h4>Rating</h4>
      <figure className="rating-figure">{renderRating()}</figure>
    </section>
  );
};

export default Rating;
