import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

const LoginTest = () => {
  const loginMutation = useLogin();

  useEffect(() => {
    const hardcodedCredentials = {
      email: "elimen@gmail.com",
      password: "1234567pas",
    };

    loginMutation.mutate(hardcodedCredentials);
  }, []);

  return <div></div>;
};

export default LoginTest;
