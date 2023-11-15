import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  login: false,
  isInitialized: false,
  user: null,
  email: null,
  role: null,
  entradaList: [],
  eventoList: [],
};

const AppStateContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isInitialized: action.payload.isInitialized,
        login: action.payload.login,
      };
    case "SET_DATA_USER":
      return {
        ...state,
        isInitialized: action.payload.isInitialized,
        login: action.payload.login,
        user: action.payload.user,
      };
    case "SET_ENTRADAS":
      return { ...state, entradaList: action.payload.entradas };
    case "SET_EVENTOS":
      return { ...state, eventoList: action.payload.eventos };
    case "ADD_ENTRADA":
      return {
        ...state,
        entradaList: [action.payload.entrada, ...state.entradaList],
      };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    getEventos();
  }, []);

  const getEventos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URI_API}api/eventos`
      );
      dispatch({
        type: "SET_EVENTOS",
        payload: {
          eventos: response.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const initialize = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getUser();
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isInitialized: true,
            login: false,
          },
        });
      }
    };

    initialize();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URI_API}api/get-user`
      );
      const misEntradas = await axios.get(
        `${import.meta.env.VITE_URI_API}api/entradas`
      );
      dispatch({
        type: "SET_DATA_USER",
        payload: {
          isInitialized: true,
          login: true,
          user: response.data.usuario,
        },
      });
      dispatch({
        type: "SET_ENTRADAS",
        payload: {
          entradas: misEntradas.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addEntrada = (entrada) => {
    dispatch({
      type: "ADD_ENTRADA",
      payload: {
        entrada: entrada,
      },
    });
  };

  const onLogin = async (email) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URI_API}api/login`,
        { email: email, role: "normal" }
      );
      sessionStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      dispatch({
        type: "SET_DATA_USER",
        payload: {
          isInitialized: true,
          login: true,
          user: response.data.usuario,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppStateContext.Provider value={{ state, dispatch, onLogin, addEntrada }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "useAppState debe ser utilizado dentro de un AppStateProvider"
    );
  }
  return context;
};
