export interface SelectedProduct {
    product_id: string,
    quantity: number
}

export interface IInitiatePurchaseDTO {
    user_id: string,
    selected_products: SelectedProduct[]
}