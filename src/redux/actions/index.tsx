import * as Type from "../types";
import axios from 'axios';

const serverRoot = 'http://127.0.0.1:3333';
const sedesURL = '/api/sedes';
const sedeURL = '/api/sede';
const loginURL = '/api/login';
const usersURL = '/api/users';
const userURL = '/api/user';
// const sedeURL = '/api/sede';
// const examenesURL = '/api/examenes';
// const saveSedesURL = '/api/sede';

export function fetchSedes(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.FETCH_SEDES, payload: null});
        try {
            const request = await axios({
                method: 'get',
                url: serverRoot + sedesURL
            });
            dispatch({type: Type.FETCH_SEDES_SUCCESS, payload: {data: request.data}});
        }
        catch (e) {
            dispatch({type: Type.FETCH_SEDES_FAIL, payload: {error: e}});
        }
    }
}
export function validatePassword(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.VALIDATE_PASSWORD, payload})
        try {
            const request = await axios({
                method: 'post',
                url: serverRoot + loginURL,
                data: payload
            });

            dispatch({type: Type.VALIDATE_PASSWORD_SUCCESS, payload: {data: request.data}});
        }
        catch (e) {
            dispatch({type: Type.VALIDATE_PASSWORD_FAIL, payload: {error: e}});
            setTimeout(function(){
                dispatch({type: Type.VALIDATE_PASSWORD, payload: null});
            }, 800);
        }
    }
}
export function selectMenuItem(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.SELECT_MENU_ITEM, payload});
        switch (payload.key) {
            case '1':
                dispatch({type: Type.FETCH_USERS, payload});
                try {
                    const request = await axios({
                        method: 'get',
                        url: serverRoot + usersURL
                    });
                    dispatch({type: Type.FETCH_USERS_SUCCESS, payload: {data: request.data}});
                }
                catch (e) {
                    dispatch({type: Type.FETCH_USERS_FAIL, payload: {error: e}});
                }
                break;
            case '2':
                console.log('2')
                dispatch({type: Type.FETCH_SEDES, payload});
                try {
                    const request = await axios({
                        method: 'get',
                        url: serverRoot + sedesURL
                    });
                    dispatch({type: Type.FETCH_SEDES_SUCCESS, payload: {data: request.data}});
                }
                catch (e) {
                    dispatch({type: Type.FETCH_SEDES_FAIL, payload: {error: e}});
                }
                break;
        }

    }
}
export function selectUserActionItem(payload: any) {
    return function action(dispatch: any) {
        return dispatch({type: Type.SELECT_USER_ACTION_ITEM, payload})
    }
}
export function setUserModalState(payload: any) {
    return function action(dispatch: any) {
        return dispatch({type: Type.SET_USER_MODAL_STATE, payload})
    }
}
export function saveUser(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.SAVE_USER, payload});
        try {
            await axios({
                method: 'post',
                url: serverRoot + userURL,
                data: payload
            });
            //dispatch({type: Type.SAVE_USER_SUCCESS, payload: {data: request.data}});
            dispatch({type: Type.FETCH_USERS});
        }
        catch (e) {
            dispatch({type: Type.SAVE_USER_FAIL, payload: {error: e}});
        }

    }
}
export function fetchUser(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.FETCH_USER, payload: null});
        try {
            const request = await axios({
                method: 'get',
                url: serverRoot + userURL + '/' + payload
            });
            dispatch({type: Type.FETCH_USER_SUCCESS, payload: {data: request.data}});
        }
        catch (e) {
            dispatch({type: Type.FETCH_USER_FAIL, payload: {error: e}});
        }
    }
}
export function fetchSede(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.FETCH_SEDE, payload: null});
        try {
            const request = await axios({
                method: 'get',
                url: serverRoot + sedeURL + '/' + payload
            });
            dispatch({type: Type.FETCH_SEDE_SUCCESS, payload: {data: request.data}});
        }
        catch (e) {
            dispatch({type: Type.FETCH_SEDE_FAIL, payload: {error: e}});
        }
    }
}

export function selectSedeActionItem(payload: any) {
    return function action(dispatch: any) {
        return dispatch({type: Type.SELECT_SEDE_ACTION_ITEM, payload})
    }
}
export function setSedesModalState(payload: any) {
    return function action(dispatch: any) {
        return dispatch({type: Type.SET_SEDES_MODAL_STATE, payload})
    }
}
export function saveSede(payload: any) {
    return async function action(dispatch: any) {
        dispatch({type: Type.SAVE_SEDE, payload});
        try {
            let request = await axios({
                method: 'post',
                url: serverRoot + sedeURL,
                data: payload
            });
            dispatch({type: Type.SAVE_SEDE_SUCCESS, payload: {data: request.data}});
            dispatch(fetchSedes(null));
        }
        catch (e) {
            dispatch({type: Type.SAVE_SEDE_FAIL, payload: {error: e}});
        }

    }
}
