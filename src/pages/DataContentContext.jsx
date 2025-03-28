import React, { createContext, useEffect, useState, useContext } from "react";
import { APIContext } from "./APIContext";

export const DataContentContext = createContext();

export const DataProvider= ({ children }) => {
    const [ datacontent, setDatacontent ] = useState([]);
    const { apiUrl } = useContext(APIContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/get_quizzes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const data = await response.json();
            setDatacontent(data);
        } catch (error) {
            console.error("Error fetching Data:", error);
        }
      };
      fetchData();
    }, []);


  return (
    <DataContentContext.Provider value={{ datacontent, setDatacontent }}>
        {children}
    </DataContentContext.Provider>
  );
};

export const useDataContent = () => useContext(DataContentContext);