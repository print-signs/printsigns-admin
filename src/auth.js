export const isAutheticated = () => {
    if (typeof window == "undefined") {
        return true;
    }
    if (localStorage.getItem("auth")) {

        return JSON.parse(localStorage.getItem("auth"));
    } else {
        return false;
    }
};

export const signout = () => {
    localStorage.removeItem("auth");

    return true;
};
