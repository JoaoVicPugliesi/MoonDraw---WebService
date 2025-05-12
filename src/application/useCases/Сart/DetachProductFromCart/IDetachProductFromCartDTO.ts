// Request
export interface IDetachProductFromCartDTO {
    cart_id: string,
    product_id: string
}

// Response
export class AttachmentDoesNotExistsErrorResponse extends Error {}
export interface Success {
    success: boolean
}

export type IDetachProductFromCartResponse =
| AttachmentDoesNotExistsErrorResponse
| Success