// import React, { createContext, useContext, useReducer } from "react";

// // Create a context
// export const UserContext = createContext();

// // Define an initial state for the user
// const initialState = {
//   userId: null,
//   role: "visitor", // Default role (you can change it based on your logic)
// };

// // Define action types for updating the user state
// const SET_USER = "SET_USER";
// const CLEAR_USER = "CLEAR_USER";

// // Create a reducer function to update the user state
// const userReducer = (state, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         userId: action.payload.userId,
//         role: action.payload.role,
//       };
//     case CLEAR_USER:
//       return {
//         ...state,
//         userId: null,
//         role: "visitor",
//       };
//     default:
//       return state;
//   }
// };

// // Create a UserProvider component to wrap your application
// export const UserProvider = ({ children }) => {
//   const [user, dispatch] = useReducer(userReducer, initialState);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser: (data) => dispatch({ type: SET_USER, payload: data }),
//         clearUser: () => dispatch({ type: CLEAR_USER }),
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Create a custom hook to access the user context
// export const useUser = () => {
//   return useContext(UserContext);
// };
