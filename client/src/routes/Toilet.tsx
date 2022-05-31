import Comments from "../components/Comments";
import Header from "../components/Header";
import ToiletInfo from "../components/ToiletInfo";

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
