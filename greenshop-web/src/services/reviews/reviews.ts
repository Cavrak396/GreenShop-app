import axios from "axios";
import { ReviewDto, ApiError } from "./reviewsTypes";

const API_BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleApiError = (error: any): ApiError => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    return error.response.data as ApiError;
  }
  console.error("Unexpected Error:", error.message);
  return { message: error.message } as ApiError;
};

export const getPlantReviews = async (plantId: string): Promise<ReviewDto[]> => {
  try {
    const response = await axiosInstance.get<ReviewDto[]>(`/reviews/${plantId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const createReview = async (reviewDto: ReviewDto): Promise<ReviewDto> => {
  try {
    const response = await axiosInstance.post<ReviewDto>("/reviews", reviewDto);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export default axiosInstance;
