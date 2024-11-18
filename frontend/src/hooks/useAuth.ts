import axios from "axios";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function useAuth () {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const sign_up = async () : Promise<void> => {
        try {
            const { data, status } = await axios.post('http://localhost:8080/api/signup', { username, email, password }, { withCredentials : true });
            if(status === 201) {
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const sign_in = async () : Promise<void> => {
        try {
            const { data, status } = await axios.post('http://localhost:8080/api/login', { email, password }, { withCredentials : true });
            if(status === 200) {
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return {setEmail, setPassword, setUsername, sign_up, sign_in }

}