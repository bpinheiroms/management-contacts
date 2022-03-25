const Modal = ({ children }: any) => {
  return (
    <div
      className="py-12 bg-black bg-opacity-80 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 "
      id="modal">
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
