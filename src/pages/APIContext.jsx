import React, { createContext, useState } from 'react';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [apiUrl] = useState("http://192.168.0.110:3001"); 
  
    return (
      <APIContext.Provider value={{ apiUrl }}>
        {children}
      </APIContext.Provider>
    );
  };
  
export const useApi = () => useContext(APIContext);