declare module "types" {
    export type Reducer<State, Action> = (
        state: State,
        action: Action,
    ) => State;

    export type SignUpRequest = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
    };

    export type LoginRequest = {
        email: string;
        password: string;
    };

    export type XirrTransaction = {
        amount: number;
        date: Date | string;
    };

    export type StockParams = {
        symbol?: string;
        exchange?: string;
        country?: string;
    };

    export type StockReferenceData = {
        symbol: string;
        name: string;
        currency: string;
        exchange: string;
        mic_code: string;
        country: string;
        type: string;
    };
}
