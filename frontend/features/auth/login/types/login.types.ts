export type LoginDto = {
    npm_nidn: string;
    password: string;
};

export type User = {
    id: number;
    name: string;
    role: "admin" | "dosen" | "mahasiswa";
};

export type LoginResponse = {
    message: string;
    token: string;
    user: User;
};