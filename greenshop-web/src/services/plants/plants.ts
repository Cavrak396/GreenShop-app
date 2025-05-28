import { PlantsParams } from "./plantsTypes";
import { ProductType } from "../../components/homepage-shop/types/shopTypes";
import axios from "axios";

const BASE_URL = "https://localhost:7178/Plants";
const token = sessionStorage.getItem("token");

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
        const response = await axios.get(BASE_URL, {
            headers: {
                SearchValue: searchValue || "",
                CategoryValue: categoryValue || "",
                SizeType: sizeType || "",
                Group: group || "",
                PriceMin: priceMin || "",
                PriceMax: priceMax || "",
                Authorized: token ? true : false,
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
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: {
                Authorized: token ? true : false,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plant by ID:", error);
        throw error;
    }
};

export const fetchPlantsNumberByCategories = async (categories: string[]) => {
    try {
        const response = await axios.get(`${BASE_URL}/category-number`, {
            params: {
                categories: categories,
            },
            paramsSerializer: () => {
                return categories.map((c) => `categories=${encodeURIComponent(c)}`).join("&");
            },
            withCredentials: false,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plants number by categories:", error);
        throw error;
    }
};

export const fetchTotalPlantsNumber = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/total-number`, {
            withCredentials: false,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching total plants number:", error);
        throw error;
    }
};

export const fetchPlantsNumberBySize = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/size-number`, {
            withCredentials: false,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plants number by size:", error);
        throw error;
    }
};
