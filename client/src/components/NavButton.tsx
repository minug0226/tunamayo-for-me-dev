import { NavProps } from "../types/common";

const NavButton = ({ setDrawer }: NavProps) => {
  return (
    <>
      <div
        onClick={() => setDrawer(true)}
        className="cursor-pointer w-11 h-11 rounded-full shadow-navButton absolute top-[75px] left-[21px] bg-white flex items-center justify-center"
      >
        <img
          className="w-[18px] h-4"
          src="/images/main/nav-icon.svg"
          alt="nav-icon"
        />
      </div>
    </>
  );
};

export default NavButton;
