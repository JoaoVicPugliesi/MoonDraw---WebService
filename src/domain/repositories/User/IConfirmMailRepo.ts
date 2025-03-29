export interface IConfirmMailRepo {
    findUser<T>(param: T): Promise<boolean>;
    activateUser<T>(param: T): Promise<void>;
}