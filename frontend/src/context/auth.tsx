import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>({});
export default function AuthProvider({ children }: any) {

    const [isLoading, setIsLoading] = useState(true);

    const [currentuser, setCurrentuser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const currentUser = async () : Promise<void> => {
            try {
                const { data, status } = await axios.get('http://localhost:8080/api/currentuser', { withCredentials : true });
                if(status === 200) {
                    setCurrentuser(data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        currentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoading, currentuser, isAuthenticated, setIsAuthenticated, setCurrentuser }}>
            {children}
        </AuthContext.Provider>
    )
}