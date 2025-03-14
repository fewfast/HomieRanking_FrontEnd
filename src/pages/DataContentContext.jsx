import React, { createContext, useState } from "react";

export const DataContentContext = createContext();

export const DataProvider= ({ children }) => {
    const [ datacontent ] = useState([
        { 
          Title: "The Best GPU of All time", 
          description: "Who wins the GPU battle?",
          thumbnail: "https://lh3.googleusercontent.com/d/1lKAjHM01VEY2FgJ-aM7qsB0TM-quBwRv", 
          category: "GAMES" 
        },
        { 
          Title: "The Best FastFood in the World", 
          description: "What is the best fast food in the world?",
          thumbnail: "https://247news.com.pk/wp-content/uploads/2024/11/Best-Fast-Food-Suggestions-for-Visitors-in-Islamabad.webp", 
          category: "FOODS" 
        },
        { 
          Title: "The Best THAI Songs",
          description: "What is the best Thai song?", 
          thumbnail: "https://res.klook.com/image/upload/v1729240216/thsosfuiyuagpqkldx5y.jpg", 
          category: "SONGS" 
        },
        { 
          Title: "Messi or Ronaldo?", 
          description: "Who is the best football player?",
          thumbnail: "https://lahstalon.org/wp-content/uploads/2024/05/Real-Ronaldo-V-Messi-2.png", 
          category: "SPORTS" 
        },
        { 
          Title: "Example Title", 
          description: "Example Description",
          thumbnail: "https://lh3.googleusercontent.com/d/1Y-laWcMHPs2iDOwS28ubWUTITePA-hYJ", 
          category: "CATEGORY" 
        }
      ]);

  return (
    <DataContentContext.Provider value={{ datacontent }}>
        {children}
    </DataContentContext.Provider>
  );
};