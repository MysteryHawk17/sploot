export interface UserData {
  name: string;
  email: string;
  password: string;
  profilePic: File | null;
}

export interface User {
  profilePic: string;
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface LoginResponse {
  token: string;
  user: User
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface Blog {
  title: string;
  description: string;
  userId: { email: string; _id: string };
  category: string;
  link?: string;
}

export interface BlogInput {
  title: string;
  description: string;
  category: string;
  link?: string;
}

export interface Category {
  _id: string;
  name: string;
  thumbnail: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
