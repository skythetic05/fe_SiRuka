export type RegisterDto = {
  nama: string;
  npm_nidn: string;
  email: string;
  password: string;
  role: "mahasiswa" | "dosen";
};

export type RegisterResponse = {
  message: string;
};