export type UserCredentials = {
  id: string;
  name: string;
  email: string;
};

export type BookResult = {
  title: string;
  author_name: string[];
  editions?: { docs?: { key: string }[] };
};

export type BookDetails = {
  author: string;
  title: string;
  coverURL: string;
};
