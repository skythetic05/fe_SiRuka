export type RegisterDto = {
  nama: string;
  npm_nidn: string;
  email: string;
  password: string;
  role: "Mahasiswa" | "Dosen";
};

export type RegisterResponse = {
  message: string;
};