import React, { createContext, useState } from "react";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [ categories ] = useState([
        { icon: "⭐", name: "TRENDING" },
        { icon: "⏳", name: "LATEST" },
        { icon: "🎮", name: "GAMES" },
        { icon: "🎧", name: "SONGS" },
        { icon: "🍔", name: "FOODS" },
        { icon: "⚽", name: "SPORTS" },
        { icon: "🎬", name: "MOVIES" },
        { icon: "🎨", name: "ARTS" }, 
    ]);

  return (
    <CategoriesContext.Provider value={{ categories }}>
        {children}
    </CategoriesContext.Provider>
  );
};