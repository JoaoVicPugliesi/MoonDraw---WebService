// Request
export interface IAttachProductIntoCartDTO {
    cart_id: string,
    product_id: string
}

// Response
export class AttachmentAlreadyExistsErrorResponse extends Error {}

export interface IAttachProductIntoCartResponse {
    success: boolean
}