import Books from "../components/Books";
import Albums from "../components/Albums";
import LoginTest from "../test/loginTest";

const Home = () => {
  return (
    <div className="flex justify-around items-center w-screen">
      <Books />
      <LoginTest />
    </div>
  );
};

export default Home;
