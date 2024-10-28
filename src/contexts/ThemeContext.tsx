// import React, { createContext, useReducer, useContext } from 'react';

// // Typ för tema
// type Theme = 'light' | 'dark';

// interface ThemeState {
//   theme: Theme;
// }

// interface ThemeAction {
//   type: 'TOGGLE_THEME';
// }

// const initialState: ThemeState = { theme: 'light' }; // Starttema

// // Reducer-funktion för att växla tema
// const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
//   switch (action.type) {
//     case 'TOGGLE_THEME':
//       return { theme: state.theme === 'light' ? 'dark' : 'light' };
//     default:
//       return state;
//   }
// };

// // Skapa Context för tema och dispatch
// const ThemeContext = createContext<ThemeState | undefined>(undefined);
// const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction> | undefined>(undefined);

// // Provider-komponent för temat
// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(themeReducer, initialState);

//   return (
//     <ThemeContext.Provider value={state}>
//       <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
//     </ThemeContext.Provider>
//   );
// };

// // Använd ThemeContext
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
//   return context;
// };

// // Använd ThemeDispatchContext
// export const useThemeDispatch = () => {
//   const context = useContext(ThemeDispatchContext);
//   if (context === undefined) throw new Error('useThemeDispatch must be used within a ThemeProvider');
//   return context;
// };
