import { StarRatingProps } from "../../types/common";

const StarRating = ({ rating, imgClass, starColor }: StarRatingProps) => {
  const numberOfFilled = Math.floor(rating);
  const numberOfHalfFilled = rating % 1 === 0 ? 0 : 1;
  const numberOfNonFilled = 5 - (numberOfFilled + numberOfHalfFilled);

  return (
    <>
      {Array(numberOfFilled)
        .fill(1)
        .map((_, i) => (
          <div key={i}>
            <img
              className={imgClass}
              src={`/images/star/star-filled-${starColor}.svg`}
              alt="filled"
            />
          </div>
        ))}

      {Array(numberOfHalfFilled)
        .fill(1)
        .map((_, i) => (
          <div key={i}>
            <img
              className={imgClass}
              src={`/images/star/star-half-${starColor}.svg`}
              alt="half"
            />
          </div>
        ))}

      {Array(numberOfNonFilled)
        .fill(1)
        .map((_, i) => (
          <div key={i}>
            <img
              className={imgClass}
              src="/images/star/star-non-blue.svg"
              alt="non"
            />
          </div>
        ))}
    </>
  );
};

export default StarRating;
