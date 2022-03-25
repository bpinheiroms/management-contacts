import NavBar from '../components/NavBar';

const MainLayout = ({ children }: any) => {
  return (
    <div className="mx-auto min-h-screen w-full  bg-gray-800 text-white">
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
