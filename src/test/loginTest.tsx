import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

const LoginTest = () => {
  const loginMutation = useLogin();

  useEffect(() => {
    const hardcodedCredentials = {
      username: "johnd",
      password: "m38rmF$",
    };

    loginMutation.mutate(hardcodedCredentials);
  }, []);

  return <div></div>;
};

export default LoginTest;
