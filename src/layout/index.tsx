import NavBar from '../components/NavBar';

const MainLayout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
