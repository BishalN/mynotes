export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type InputError = { field: string; message: string };
export type InputErrors = InputError[];

export type User = {
  id: string;
  bio: string;
  email: string;
  facebokId: string;
  imageUrl: string;
  name: string;
  googleId: string;
  localEmailVerified: string;
};
