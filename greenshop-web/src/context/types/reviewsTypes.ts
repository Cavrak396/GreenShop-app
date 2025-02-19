export interface Comment {
    id?: string;
    plantId: string;
    comment: string;
    rating: number;
    userName: string;
    creationDate: string;
}

export interface ReviewDto {
    plantId: string;
    comment: string;
    rating: number;
    userId?: string;
    userName: string;
    creationDate: string;
}

export interface CommentsContextType {
    comments: Comment[];
    userComment: Comment | null;
    loading: boolean;
    fetchComments: (plantId: string) => Promise<void>;
    fetchUserComment: (plantId: string) => Promise<void>;
    addComment: (plantId: string, comment: string, rating: number) => Promise<void>;
    removeComment: (plantId: string) => Promise<void>;
    updateComment: (plantId: string, comment: string, rating: number) => Promise<void>;
}

export interface DetailsCritiqueCommentsListProps {
    comments: Comment[];
    loading: boolean;
}

export interface DetailsCritiqueCommentsPersonalProps {
    comment: Comment;
}