import { CREATE_USER_ACTIONS, DELETE_USER_ACTIONS, GET_DATA_ACTIONS, LOGIN_ACTIONS } from "../../actionsType/common";

const intialState = {
    loginData: [],
    isLoginLoader: false,
    userData: {},
    isUserLoader: false,
    createUser: {},
    isCreateUserLoader: false,
    delete: {},
    isdeleteLoader: false,

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
        // DELETE USER DATA
        case CREATE_USER_ACTIONS.CREATE_USER_REQUEST:
            return { ...state, createUser: payload, isCreateUserLoader: false };
        case CREATE_USER_ACTIONS.CREATE_USER_RESPONSE:
            return { ...state, createUser: payload, isCreateUserLoader: true };

        case CREATE_USER_ACTIONS.CREATE_USER_ERROR:

            return { ...state, createUser: payload, isCreateUserLoader: false };

        // DELETE USER DATA
        case DELETE_USER_ACTIONS.DELETE_USER_REQUEST:
            return { ...state, delete: payload, isdeleteLoader: false };
        case DELETE_USER_ACTIONS.DELETE_USER_RESPONSE:
            return { ...state, delete: payload, isdeleteLoader: true };

        case DELETE_USER_ACTIONS.DELETE_USER_ERROR:

            return { ...state, delete: payload, isdeleteLoader: false };


        //default
        default:
            return state;
    }
};
