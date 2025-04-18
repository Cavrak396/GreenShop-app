export interface CartApiItemDto {
    plantId: string;
    quantity: number;
}

export interface CartDto {
    items: CartApiItemDto[];
    totalPrice: number;
}