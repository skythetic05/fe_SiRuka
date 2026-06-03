export const authService = {
    setToken: (token: string) => {
        localStorage.setItem("access_token", token);
    },
    getToken: () => {
        return localStorage.getItem("access_token");
    },
    setUser: (user: any) => {
        localStorage.setItem("user", JSON.stringify(user));
    },
    getUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },
    logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    },
};