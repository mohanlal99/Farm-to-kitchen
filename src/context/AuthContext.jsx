import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../utils/firebase";
  import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";


export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SUCCESS":
      return { ...state, loading: false, error: null, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: true, // initially true while checking auth
    error: null,
  });


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "farm-users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.exists() ? docSnap.data() : null;
        dispatch({ type: "SUCCESS", payload: { ...user, ...userData } });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  });

  return () => unsubscribe();
}, []);

  const logout = async () => {
    dispatch({ type: "LOADING" });
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        role:state.user?.role,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
