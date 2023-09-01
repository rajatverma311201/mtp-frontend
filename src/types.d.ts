declare module "types" {
    export type Cagr = {
        presentValue: number;
        futureValue: number;
        years: number;
        cagr: number;
    };
    export type Reducer<State, Action> = (
        state: State,
        action: Action
    ) => State;
}
