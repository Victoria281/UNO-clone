// @ts-nocheck

export const SecurityReducer = (state = {}, action) => {
    switch (action.type) {

        case "secure_action":
            return { ...action.payload };
        default:
            return state;
    }
};