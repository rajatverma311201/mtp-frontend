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

    export type StockReferenceData = {
        search_id: string;
        nse_scrip_code: string;
        bse_scrip_code: string;
        title: string;
    };
}
// {
//     analytics_label: "DEFAULT_GLOBAL_SEARCH_FLOW";
//     bse_scrip_code: "500180";
//     entity_type: "Stocks";
//     expiry: null;
//     fund_name: null;
//     groww_contract_id: "GSTK500180";
//     id: "hdfc-bank-ltd";
//     isin: "INE040A01034";
//     nse_scrip_code: "HDFCBANK";
//     scheme_code: null;
//     scheme_name: null;
//     scheme_search: null;
//     search_id: "hdfc-bank-ltd";
//     search_string: null;
//     term_page_view: 379966;
//     tiker: null;
//     title: "HDFC Bank Ltd.";
//     underlying_search_id: null;
// }
