export interface ICart {
    id: number,
    public_id: string,
    user_id: string,
    created_at: Date
}

export class Cart implements ICart {
    constructor(
        readonly id: number,
        readonly public_id: string,
        readonly user_id: string,
        readonly created_at: Date
    ) {}
}