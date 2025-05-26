import { api } from "../../../services/api";
import { Auth, data } from "../../../services/apiVariables";
// import { Toast } from "../../../services/toast";
import { CREATE_USER_ACTIONS, DELETE_USER_ACTIONS, GET_DATA_ACTIONS, LOGIN_ACTIONS } from "../../actionsType/common";

export const LoginAuth =
    (body: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch({
            type: LOGIN_ACTIONS.LOGIN_REQUEST,
            payload: { isLoginLoader: true },
        });
        return new Promise((resolve, reject) => {
            api({ ...Auth.login, body })
                .then((data: any) => {
                    console.log("Country", data);
                    dispatch({
                        type: LOGIN_ACTIONS.LOGIN_RESPONSE,
                        payload: data,
                    });
                    resolve(data);
                })
                .catch((error) => {
                    dispatch({
                        type: LOGIN_ACTIONS.LOGIN_ERROR,
                        payload: [],
                    });
                    reject(error);
                });
        });
    };
export const GetTableData =
    (body: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch({
            type: GET_DATA_ACTIONS.GET_DATA_REQUEST,
            payload: { isDataLoader: true },
        });
        return new Promise((resolve, reject) => {
            api({ ...data.getData, body })
                .then((data: any) => {
                    console.log("Country", data);
                    dispatch({
                        type: GET_DATA_ACTIONS.GET_DATA_RESPONSE,
                        payload: data,
                    });
                    resolve(data);
                })
                .catch((error) => {
                    dispatch({
                        type: GET_DATA_ACTIONS.GET_DATA_ERROR,
                        payload: [],
                    });
                    reject(error);
                });
        });
    };
export const createUser =
    (body: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch({
            type: CREATE_USER_ACTIONS.CREATE_USER_REQUEST,
            payload: { isDataLoader: true },
        });
        return new Promise((resolve, reject) => {
            api({ ...data.createUser, body })
                .then((data: any) => {
                    console.log("Country", data);
                    dispatch({
                        type: CREATE_USER_ACTIONS.CREATE_USER_RESPONSE,
                        payload: data,
                    });
                    resolve(data);
                })
                .catch((error) => {
                    dispatch({
                        type: CREATE_USER_ACTIONS.CREATE_USER_ERROR,
                        payload: [],
                    });
                    reject(error);
                });
        });
    };
export const deletUser =
    (body: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch({
            type: DELETE_USER_ACTIONS.DELETE_USER_REQUEST,
            payload: { isDataLoader: true },
        });
        return new Promise((resolve, reject) => {
            let prefixUrl = `?${body.id}`
            api({ ...data.delete, body, prefixUrl })
                .then((data: any) => {
                    console.log("Country", data);
                    dispatch({
                        type: DELETE_USER_ACTIONS.DELETE_USER_RESPONSE,
                        payload: data,
                    });
                    resolve(data);
                })
                .catch((error) => {
                    dispatch({
                        type: DELETE_USER_ACTIONS.DELETE_USER_ERROR,
                        payload: [],
                    });
                    reject(error);
                });
        });
    };
