export type Author = {
    id: number;
    name: string;
    rating_author_given_count: number;
};

export type AuthorBook = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Book = {
    id: number;
    title: string;
    description: string;
    author_id: number;
    category_id: number;
    created_at: string | null;
    updated_at: string | null;
    total_voters: number;
    avg_rating: number;
    author: AuthorBook;
    category: Category;
};