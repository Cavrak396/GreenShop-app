import { PlantsParams } from "./plantsTypes";
import axios from "axios";

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

    const baseUrl = "http://localhost:8080/Plants"

    try {
        const response = await axios.get(baseUrl, {
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