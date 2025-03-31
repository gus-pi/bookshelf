export type UserCredentials = {
  id: string;
  name: string;
  email: string;
};

export type BookResult = {
  title: string,
  author_name: string[],
  key: string
}