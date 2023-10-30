import React, { useReducer, createContext, useContext, ReactNode } from "react";

const initialState = {
  token: null as string | null,
  user: null as any,
  isLogged: false as boolean | undefined,
};

type State = typeof initialState;

type Action =
  | { type: "LOGIN"; payload: { token: string; user: any; isLogged?: boolean } }
  | { type: "LOGOUT" };

export const AuthContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        // isLogged: action.payload.isLogged,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth повинен використовуватися в межах AuthProvider");
  }
  return context;
};
