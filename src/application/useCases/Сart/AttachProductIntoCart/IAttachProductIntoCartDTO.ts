// Request
export interface IAttachProductIntoCartDTO {
    cart_id: string,
    product_id: string
}

// Response
export class AttachmentAlreadyExistsErrorResponse extends Error {}
export interface Success {
    success: boolean
}

export type IAttachProductIntoCartResponse = 
| AttachmentAlreadyExistsErrorResponse
| Success