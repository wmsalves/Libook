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

export const ReadingStatus = {
  WANT_TO_READ: "WANT_TO_READ",
  READING: "READING",
  READ: "READ",
} as const;

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus];

export type UserStatuses = Record<string, ReadingStatus>;
