import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const login = async(email, password) => {
    try {
      setIsLoading(true)
      const {data} = await axios.post("https://barreltrackerback.onrender.com/api/user/login", {email, password});
      await AsyncStorage.setItem('token', data?.token)
      getAuth(data?.token);
  } catch (error) {
      console.log(error)
  }
  }

  const getAuth = async(auth) => {
    try {
        const { data } = await axios.get('https://barreltrackerback.onrender.com/api/user/status', 
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },});
      if (!data?.isLogged) setAuth({ isLogged: false });
      else setAuth({ isLogged: true, role: data.role });
      setIsLoading(false)
    } catch (error) {
        console.log(error)
        setAuth("")
    }
}

  const logout = () => {
    AsyncStorage.removeItem('token')
    getAuth();
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;