import React, { createContext, useEffect, useState } from "react";

export const DataContentContext = createContext();

export const DataProvider= ({ children }) => {
    const [ datacontent, setDatacontent ] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch("https://upgraded-yodel-wr6wvxv4j5qc9r4-3001.app.github.dev/get_quizzes", {
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
    <DataContentContext.Provider value={{ datacontent }}>
        {children}
    </DataContentContext.Provider>
  );
};