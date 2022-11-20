import React, { createContext, useReducer } from "react";

const initialState: IApplicationState = {
  clients: [],
  notif: null,
};

export const StateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

export const ACTIONS = {
  FETCH_ALL_CLIENTS: "FETCH_ALL_CLIENTS" as const,
  ADD_CLIENT: "ADD_CLIENT" as const,
  ADD_NOTIF: "ADD_NOTIF" as const,
  REMOVE_NOTIF: "REMOVE_NOTIF" as const,
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_CLIENTS:
      return { ...state, clients: action.data };
    case ACTIONS.ADD_CLIENT:
      return {
        ...state,
        clients: [action.data, ...state.clients]
      };
    case ACTIONS.ADD_NOTIF:
      return { ...state, notif: action.data };
    case ACTIONS.REMOVE_NOTIF:
      return { ...state, notif: null };
    default:
      return state;
  }
};

export default function DataProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
