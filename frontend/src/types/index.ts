export interface Book {
  id: string;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  authors: { author: { name: string } }[];
  categories: { category: { name: string } }[];
}
