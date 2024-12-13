import axios from "axios";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { pre } from "framer-motion/client";

export default function useAuth() {
  const { setIsAuthenticated, setCurrentuser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const sign_up = async (): Promise<void> => {
    if(!username || !email || !password) {
      setErrors({
        ...errors,
        username: !username ? "Username is required" : "",
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      })
      return 
    }
    if(!email.includes("@")){
      setErrors({
        ...errors,
        email: "Invalid email",
      })
      return
    }
    setErrors({ username: "", email: "", password: "" });
    try {
      const { data, status } = await axios.post(
        "http://localhost:8080/api/signup",
        { username, email, password },
        { withCredentials: true }
      );
      if (status === 201) {
        setIsAuthenticated(true);
        setCurrentuser(data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sign_in = async (): Promise<void> => {
    if(!email || !password) {
      setErrors({
        ...errors,
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      })
      return 
    }
    setErrors({ username: "", email: "", password: "" }); 
    try {
      const { data, status } = await axios.post(
        "http://localhost:8080/api/login",
        { email, password },
        { withCredentials: true }
      );
      if (status === 200) {
        setIsAuthenticated(true);
        setCurrentuser(data.user);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setErrors((prevErrors) => {
        if (error.response.data.message === "User not found") {
          return { ...prevErrors, email: "Email not registered in the system" };
        }
        if (error.response.data.message === "Wrong password") {
          return { ...prevErrors, password: "Wrong password" };
        }
        return prevErrors; // Return unchanged errors for other cases
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setEmail,
    setPassword,
    setUsername,
    sign_up,
    sign_in,
    isLoading,
    errors,
  };
}
