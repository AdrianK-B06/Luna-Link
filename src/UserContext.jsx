import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
