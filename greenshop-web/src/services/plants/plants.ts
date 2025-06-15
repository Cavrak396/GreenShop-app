import { PlantsParams } from "./plantsTypes";
import { ProductType } from "../../components/homepage-shop/types/shopTypes";
import { BASE_URL } from "../reusable/baseUrl";
import axios from "axios";

const APPLICATION_KEY = import.meta.env.VITE_APPLICATION_KEY;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        ApplicationKey: APPLICATION_KEY,
    },
    withCredentials: false,
});

export const fetchPlants = async ({
    searchValue,
    categoryValue,
    sizeType,
    group,
    priceMin,
    priceMax,
    page,
    pageSize,
}: PlantsParams) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axiosInstance.get("/plants", {
            headers: {
                Authorized: token ? true : false,
                SearchValue: searchValue || "",
                CategoryValue: categoryValue || "",
                SizeType: sizeType || "",
                Group: group || "",
                PriceMin: priceMin || "",
                PriceMax: priceMax || "",
            },
            params: {
                page,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plants:", error);
        throw error;
    }
};

export const fetchPlantById = async (id: string): Promise<ProductType> => {
    try {
        const response = await axiosInstance.get(`/plants/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching plant by ID:", error);
        throw error;
    }
};

export const fetchPlantsNumberByCategories = async (categories: string[]) => {
    try {
        const response = await axiosInstance.get("/plants/category-number", {
            params: {
                categories,
            },
            paramsSerializer: () =>
                categories.map((c) => `categories=${encodeURIComponent(c)}`).join("&"),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plants number by categories:", error);
        throw error;
    }
};

export const fetchTotalPlantsNumber = async () => {
    try {
        const response = await axiosInstance.get("/plants/total-number");
        return response.data;
    } catch (error) {
        console.error("Error fetching total plants number:", error);
        throw error;
    }
};

export const fetchPlantsNumberBySize = async () => {
    try {
        const response = await axiosInstance.get("/plants/size-number");
        return response.data;
    } catch (error) {
        console.error("Error fetching plants number by size:", error);
        throw error;
    }
};

export const fetchRelatedPlants = async (plantId: string, relatedProductSize?: number) => {
    try {
        const response = await axiosInstance.get(`/plants/${plantId}/related`, {
            params: relatedProductSize ? { relatedProductSize } : undefined,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching related plants:", error);
        throw error;
    }
};
