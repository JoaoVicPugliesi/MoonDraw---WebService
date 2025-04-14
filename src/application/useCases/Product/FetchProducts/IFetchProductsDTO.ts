type Order = 'asc' | 'desc';
type Sort = 'name' | 'price' | 'published_at';

export interface IFetchProductsDTO {
    page?: number,
    limit?: number,
    maxPrice?: number,
    minPrice?: number,
    sortBy?: Sort,
    orderBy?: Order,
}