import Books from "../components/Books";
import LoginTest from "../test/loginTest";
import RegisterTest from "../test/registerTest";

const Home = () => {
  return (
    <div>
      <Books />
      <RegisterTest />
      <LoginTest />
    </div>
  );
};

export default Home;
