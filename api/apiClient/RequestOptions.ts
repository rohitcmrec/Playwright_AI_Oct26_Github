export interface RequestOptions {
    headers?: Record<string, string>,
    params?: Record<string, string | number | boolean>,
    timeout?: number,
    ignoreHTTPSErrors?: boolean,
    failOnStatusCode?: boolean,
    body?: object

}