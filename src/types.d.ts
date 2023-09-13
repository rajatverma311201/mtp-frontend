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
}
