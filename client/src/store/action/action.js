export const secure_action = (encrypt, text, cypher) => {
    return {
        type: "secure_action",
        payload: {
            encrypt,
            text,
            cypher,
        }
    };
};