export interface Comment {
    id?: string;
    plantId: string;
    comment: string;
    rating: number;
    userName: string;
    creationDate: string;
}

export interface CommentsContextType {
    comments: Comment[];
    loading: boolean;
    fetchComments: (plantId: string) => Promise<void>;
    addComment: (plantId: string, comment: string, rating: number) => Promise<void>;
}
