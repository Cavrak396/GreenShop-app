import { PlantsParams } from "./plantsTypes";
import axios from "axios";
import { ProductType } from "../../components/homepage-shop/shop/shopTypes";

const BASE_URL = "http://localhost:8080/Plants";

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
        const response = await axios.get(`${BASE_URL}/${id}`);
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