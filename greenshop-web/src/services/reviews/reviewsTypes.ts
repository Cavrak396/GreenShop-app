export interface ReviewDto {
    id?: string;
    plantId: string;
    userId?: string;
    rating: number;
    comment: string;
    userName?: string;
    creationDate?: string;
}

export interface ApiError {
    message: string;
    status?: number;
}
