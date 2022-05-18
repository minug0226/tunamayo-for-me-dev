import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  oneButton?: string;
  left?: string;
  right?: string;
  action?: () => void;
}

const Modal = ({
  setModal,
  action,
  title,
  oneButton,
  left,
  right,
}: ModalProps) => {
  return (
    <>
      <div className="bg-overlay top-0 absolute w-full h-[100vh]"></div>
      <div className="absolute top-[300px] w-full flex justify-center h-[128px] px-[37px]">
        <div className="w-full bg-white z-[60] rounded-[10px] shadow-2xl">
          <div className="py-[25px] text-center text-tnBlack font-bold text-base leading-6 border-b border-[#C4C4C4]">
            {title}
          </div>

          {oneButton ? (
            <div
              onClick={() => {
                setModal(false);
                action && action();
              }}
              className="flex py-[13px] justify-center items-center font-semibold text-tnBlue"
            >
              {oneButton}
            </div>
          ) : (
            <div className="flex">
              <div
                onClick={() => setModal(false)}
                className="flex-1 bg-white rounded-bl-[10px] py-4 text-center text-tnBlack border-r border-[#C4C4C4]"
              >
                {left}
              </div>

              <div
                onClick={() => {
                  action ? action() : setModal(false);
                }}
                className="flex-1 bg-white rounded-br-[10px] text-tnBlue py-4 text-center font-semibold"
              >
                {right}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
