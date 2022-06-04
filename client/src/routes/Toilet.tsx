import Comments from "../components/comment/Comments";
import ToiletInfo from "../components/toilet/ToiletInfo";

const Toilet = () => {
  return (
    <>
      <div className="relative">
        <ToiletInfo />
        <Comments />
      </div>
    </>
  );
};

export default Toilet;
