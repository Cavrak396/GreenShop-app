export interface CartApiItemDto {
    plantId: number;
    quantity: number;
}

export interface CartDto {
    items: CartApiItemDto[];
    totalPrice: number;
}