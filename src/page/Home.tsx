import Albums from "../components/Albums";
import LoginTest from "../test/loginTest";
import RegisterTest from "../test/registerTest";

const Home = () => {
  return (
    <div>
      <Albums />
      <RegisterTest />
      <LoginTest />
    </div>
  );
};

export default Home;
