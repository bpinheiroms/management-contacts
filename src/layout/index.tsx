import NavBar from '../components/NavBar';

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
