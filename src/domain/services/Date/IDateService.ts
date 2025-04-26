export interface IDateService {
    date(timestamp: {
        many: number,
        specify: string
    },
    unix: () => number
): any
}