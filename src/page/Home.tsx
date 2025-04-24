import Books from "../components/Books";
import LoginTest from "../test/loginTest";

const Home = () => {
  return (
    <div className="flex w-screen items-center justify-around">
      <Books />
      <LoginTest />
    </div>
  );
};

export default Home;
