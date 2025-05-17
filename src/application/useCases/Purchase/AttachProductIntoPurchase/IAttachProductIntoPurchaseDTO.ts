export interface IAttachProductIntoPurchaseDTO {
    purchase_id: string,
    product_id: string,
    quantity: number
}

export interface Success {
    success: boolean
}
export type IAttachProductIntoPurchaseResponse = 
| Success