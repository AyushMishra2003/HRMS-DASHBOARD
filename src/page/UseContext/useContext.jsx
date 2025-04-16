// context/UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [employeeId, setEmployeeId] = useState(null);
  const [user, setUser] = useState(null); // optional, for full user info

  return (
    <UserContext.Provider value={{ employeeId, setEmployeeId, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
