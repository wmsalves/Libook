export interface Book {
  id: string;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  authors: { author: { name: string } }[];
  categories: { category: { name: string } }[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    name: string;
  };
}
