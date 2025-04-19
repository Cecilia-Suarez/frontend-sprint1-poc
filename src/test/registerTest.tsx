import useRegister from "../hooks/useRegister";
import { useEffect } from "react";

const RegisterTest = () => {
  const registerMutation = useRegister();

  useEffect(() => {
    const hardcodedData = {
      username: "emiUser",
      email: "emi@gmail.com",
      password: "emipass",
    };

    registerMutation.mutate(hardcodedData);
  }, []);

  return <div></div>;
};

export default RegisterTest;
