import { CREATE_USER_ACTIONS, DELETE_USER_ACTIONS, GET_DATA_ACTIONS, LOGIN_ACTIONS } from "../../actionsType/common";

const intialState = {
    loginData: [],
    isLoginLoader: false,
    userData:{},
    isUserLoader: false,
    createUser:{},
    isCreateUserLoader: false,

};

export const commonReducer = (state = intialState, { type, payload }: any) => {
    switch (type) {
        // LOGIN DATA
        case LOGIN_ACTIONS.LOGIN_REQUEST:
            return { ...state, loginData: payload, isLoginLoader: false };
        case LOGIN_ACTIONS.LOGIN_RESPONSE:
            return { ...state, loginData: payload, isLoginLoader: true };

        case LOGIN_ACTIONS.LOGIN_ERROR:

            return { ...state, loginData: payload, isLoginLoader: false };

        // TABLE DATA
        case GET_DATA_ACTIONS.GET_DATA_REQUEST:
            return { ...state, userData: payload, isUserLoader: true };
        case GET_DATA_ACTIONS.GET_DATA_RESPONSE:
            return { ...state, userData: payload, isUserLoader: false };

        case GET_DATA_ACTIONS.GET_DATA_ERROR:

            return { ...state, userData: payload, isUserLoader: false };
        // CREATE USER DATA
        case DELETE_USER_ACTIONS.DELETE_USER_REQUEST:
            return { ...state, createUser: payload, isCreateUserLoader: false };
        case DELETE_USER_ACTIONS.DELETE_USER_RESPONSE:
            return { ...state, createUser: payload, isCreateUserLoader: true };

        case DELETE_USER_ACTIONS.DELETE_USER_ERROR:

            return { ...state, createUser: payload, isCreateUserLoader: false };


        //default
        default:
            return state;
    }
};
