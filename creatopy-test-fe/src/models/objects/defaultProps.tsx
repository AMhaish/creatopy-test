export interface DefaultProps {
    match?: any,
    location?: any,
    history?: any,
    computedMatch?: any,
    path?: any,
    staticContext?: any
}

export class Props implements DefaultProps {
    location: any;
    history: any;
    match: any;
    computedMatch?: any;
    path: any;
    staticContext: any
    component: any;
    exact?: boolean;
}

export default DefaultProps;