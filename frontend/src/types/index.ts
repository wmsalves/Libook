export interface Book {
  id: string;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  publicationYear: number | null;
  pageCount: number | null;
  authors: { author: { id: string; name: string } }[];
  categories: { category: { id: string; name: string } }[];
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

export interface LibraryBook extends Book {
  ReadingList: {
    status: ReadingStatus;
  }[];
}

export interface Author {
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
