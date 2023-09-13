import {
    SET_EMAIL,
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_MOBILE,
    SET_PASSWORD,
    SET_PASSWORD_CONFIRM,
    RESET,
} from "./constants";

type SignUpState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    mobile: string;
};

type SignUpAction = {
    type: string;
    payload?: string;
};

export const initialState: SignUpState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    mobile: "",
};

export const setFirstName = (firstName: string): SignUpAction => ({
    type: SET_FIRST_NAME,
    payload: firstName,
});

export const setLastName = (lastName: string): SignUpAction => ({
    type: SET_LAST_NAME,
    payload: lastName,
});
export const setEmail = (email: string): SignUpAction => ({
    type: SET_EMAIL,
    payload: email,
});
export const setPassword = (password: string): SignUpAction => ({
    type: SET_PASSWORD,
    payload: password,
});
export const setPasswordConfirm = (passwordConfirm: string): SignUpAction => ({
    type: SET_PASSWORD_CONFIRM,
    payload: passwordConfirm,
});
export const setMobile = (mobile: string): SignUpAction => ({
    type: SET_MOBILE,
    payload: mobile,
});
export const reset = (): SignUpAction => ({
    type: RESET,
});

export const reducer = (
    state: SignUpState,
    action: SignUpAction,
): SignUpState => {
    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case SET_FIRST_NAME:
            return { ...state, firstName: payload as string };
        case SET_LAST_NAME:
            return { ...state, lastName: payload as string };
        case SET_EMAIL:
            return { ...state, email: payload as string };
        case SET_PASSWORD:
            return { ...state, password: payload as string };
        case SET_PASSWORD_CONFIRM:
            return { ...state, passwordConfirm: payload as string };
        case SET_MOBILE:
            return { ...state, mobile: payload as string };
        case RESET:
            return { ...initialState };
        default:
            return state;
    }
};
