export interface RouteDefinition {
    method: 'get' | 'put';
    url: string;
    handler: (Request, Response) => void;
}
