export type HubToFrontMessage = {
    label: string,
    payload?: ApiResponsePayload
}

export type FrontToHubMessage = {
    label: string,
    payload?: ApiRequestPayload
}

export type ApiResponsePayload = {
    status: number,
    body?: string
}

export type ApiRequestPayload = {
    method: string,
    path: string,
    body?: string
}