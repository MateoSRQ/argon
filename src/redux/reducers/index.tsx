import * as Types from "../types";
//
interface ReduxState {
    appCurrentComponent: string
    appStatus: 'loaded' | 'loading' | 'fail'
    loginStatus: string | null
    loginData: object | null
    selectedItem: string

    listSedes: object[] | null
    modalSedesState: boolean

    modalUsersState: boolean
    listStatus: string
    listUsers: object[]
    viewStatus: string
    userViewData: object[] | null
}
const initialState: ReduxState = {
    //appCurrentComponent: 'login',
    appCurrentComponent: 'users',
    appStatus: 'loaded',
    loginData: null,
    selectedItem: '1',

    listStatus: 'loading',
    listUsers: [],
    viewStatus: 'loading',

    listSedes: [],
    loginStatus: null,
    modalSedesState: false,


    modalUsersState: false,
    userViewData: null

};
//
function rootReducer(state = initialState, action: any) {
    if (action.type === Types.SELECT_MENU_ITEM) {
        return Object.assign({}, state, {
            selectedItem: action.payload
        });
    }

    if (action.type === Types.FETCH_SEDES) {
        return Object.assign({}, state, {
            appStatus: 'loading',
            listStatus: 'loading',
            viewStatus: 'loading',
            appCurrentComponent: 'sedes',
        });
    }
    if (action.type === Types.FETCH_SEDES_SUCCESS) {
        return Object.assign({}, state, {
            listSedes: action.payload.data,
            appStatus: 'loaded',
            listStatus: 'loaded',
        });
    }
    if (action.type === Types.FETCH_SEDES_FAIL) {
        return Object.assign({}, state, {
            listSedes: action.payload.error,
            appStatus: 'fail'
        });
    }
    if (action.type === Types.FETCH_SEDE) {
        return Object.assign({}, state, {
            viewStatus: 'loading'
        });
    }
    if (action.type === Types.FETCH_SEDE_SUCCESS) {
        return Object.assign({}, state, {
            // listSedes: action.payload.data,
            userViewData: action.payload.data,
            viewStatus: 'loaded'
        });
    }
    if (action.type === Types.FETCH_SEDE_FAIL) {
        return Object.assign({}, state, {
            // listSedes: action.payload.error,
            viewStatus: 'fail'
        });
    }
    if (action.type === Types.SELECT_SEDE_ACTION_ITEM) {
        switch (action.payload.key) {
            case '1':
                // new sede
                return Object.assign({}, state, {
                    modalSedesState: true
                });
                break;
        }
    }
    if (action.type === Types.SET_SEDES_MODAL_STATE) {
        return Object.assign({}, state, {
            modalSedesState: action.payload
        });
    }
    if (action.type === Types.SAVE_SEDE) {
        return Object.assign({}, state, {
            //listSedes: action.payload.data,
            listStatus: 'loading',
            modalSedesState: false,
        });
    }
    if (action.type === Types.SAVE_SEDE_SUCCESS) {
        return Object.assign({}, state, {
            //listSedes: action.payload.data,
            listStatus: 'loaded',
            modalSedesState: false,
        });
    }
    if (action.type === Types.SAVE_SEDE_FAIL) {
        return Object.assign({}, state, {
            //listSedes: action.payload.data,
            listStatus: 'loaded',
            modalSedesState: false,
        });
    }

    if (action.type === Types.VALIDATE_PASSWORD) {
        return Object.assign({}, state, {
            loginStatus: null
        });
    }
    if (action.type === Types.VALIDATE_PASSWORD_SUCCESS) {
        console.log(action.payload);
        return Object.assign({}, state, {
            loginData: action.payload.data,
            appCurrentComponent: 'users'
        });
    }
    if (action.type === Types.VALIDATE_PASSWORD_FAIL) {
        return Object.assign({}, state, {
            appCurrentComponent: 'login',
            loginStatus: 'fail'
        });
    }

    if (action.type === Types.SELECT_USER_ACTION_ITEM) {
        switch (action.payload.key) {
            case '1':
                // new sede
                return Object.assign({}, state, {
                    modalUsersState: true
                });
                break;
        }
    }
    if (action.type === Types.SET_USER_MODAL_STATE) {
        return Object.assign({}, state, {
            modalUsersState: action.payload
        });
    }

    if (action.type === Types.FETCH_USERS) {
        return Object.assign({}, state, {
            appStatus: 'loading',
            listStatus: 'loading',
            viewStatus: 'loading',
            appCurrentComponent: 'users',
        });
    }
    if (action.type === Types.FETCH_USERS_SUCCESS) {
        return Object.assign({}, state, {
            listUsers: action.payload.data,
            appStatus: 'loaded',
            listStatus: 'loaded'
        });
    }
    if (action.type === Types.FETCH_USERS_FAIL) {
        return Object.assign({}, state, {
            //listSedes: action.payload.error,
            listStatus: 'fail'
        });
    }
    if (action.type === Types.FETCH_USER) {
        return Object.assign({}, state, {
            viewStatus: 'loading'
        });
    }
    if (action.type === Types.FETCH_USER_SUCCESS) {
        return Object.assign({}, state, {
            // listSedes: action.payload.data,
            userViewData: action.payload.data,
            viewStatus: 'loaded'
        });
    }
    if (action.type === Types.FETCH_USER_FAIL) {
        return Object.assign({}, state, {
            // listSedes: action.payload.error,
            viewStatus: 'fail'
        });
    }
    if (action.type === Types.SAVE_USER_SUCCESS) {
        return Object.assign({}, state, {
            // listUsers: action.payload.data,
            // listStatus: 'loaded'
        });
    }

    return state;
};


// @ts-ignore
export {ReduxState, rootReducer};
