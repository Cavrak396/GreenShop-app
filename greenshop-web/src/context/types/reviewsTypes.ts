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
    userName: string;
    creationDate: string;
}

export interface CommentsContextType {
    comments: Comment[];
    userComment: Comment | null;
    loading: boolean;
    rating: number;
    totalReviews: number | null;
    fetchComments: (plantId: string, page: number, pageSize: number) => Promise<void>;
    fetchUserComment: (plantId: string) => Promise<void>;
    fetchTotalNumberOfReviews: (plantId: string) => Promise<void>;
    addComment: (plantId: string, comment: string, rating: number) => Promise<void>;
    removeComment: (plantId: string) => Promise<void>;
    updateComment: (plantId: string, comment: string, rating: number) => Promise<void>;
    changeRating: (newRating: number) => void;
    currentPage: number;
    currentPageSize: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export interface DetailsCritiqueCommentsListProps {
    comments: Comment[];
}

export interface DetailsCritiqueCommentsPersonalProps {
    comment: Comment;
}