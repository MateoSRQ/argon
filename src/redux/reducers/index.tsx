import * as Types from "../types";
//
interface ReduxState {
    appCurrentComponent: string
    appStatus: 'loaded' | 'loading' | 'fail'
    listSedes: Object[]
    loginStatus: string | null
    selectedItem: string
    modalUsersState: boolean
    listStatus: string
    listUsers: Object[]
    viewStatus: string
    userViewData: Object[] | null
}
const initialState: ReduxState = {
    appCurrentComponent: 'users',
    appStatus: 'loaded',
    listSedes: [],
    loginStatus: null,
    selectedItem: '1',
    modalUsersState: false,
    listStatus: 'loading',
    listUsers: [],
    viewStatus: 'loading',
    userViewData: null
};
//
function rootReducer(state = initialState, action: any) {
    if (action.type === Types.FETCH_SEDES) {
        return Object.assign({}, state, {
            appStatus: 'loading'
        });
    }
    if (action.type === Types.FETCH_SEDES_SUCCESS) {
        return Object.assign({}, state, {
            listSedes: action.payload.data,
            appStatus: 'loaded'
        });
    }
    if (action.type === Types.FETCH_SEDES_FAIL) {
        return Object.assign({}, state, {
            listSedes: action.payload.error,
            appStatus: 'fail'
        });
    }

    if (action.type === Types.VALIDATE_PASSWORD) {
        return Object.assign({}, state, {
            loginStatus: null
        });
    }
    if (action.type === Types.VALIDATE_PASSWORD_SUCCESS) {
        return Object.assign({}, state, {
            appCurrentComponent: 'users'
        });
    }
    if (action.type === Types.VALIDATE_PASSWORD_FAIL) {
        return Object.assign({}, state, {
            appCurrentComponent: 'login',
            loginStatus: 'fail'
        });
    }

    if (action.type === Types.SELECT_MENU_ITEM) {
        return Object.assign({}, state, {
            selectedItem: action.payload
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

    if (action.type === Types.FETCH_USERS_SUCCESS) {
        return Object.assign({}, state, {
            listUsers: action.payload.data,
            listStatus: 'loaded'
        });
    }
    if (action.type === Types.FETCH_USERS_FAIL) {
        return Object.assign({}, state, {
            //listSedes: action.payload.error,
            listStatus: 'fail'
        });
    }

    if (action.type === Types.SAVE_USER_SUCCESS) {
        return Object.assign({}, state, {
            // listUsers: action.payload.data,
            // listStatus: 'loaded'
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

    return state;
};


// @ts-ignore
export {ReduxState, rootReducer};
