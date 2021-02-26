export type HTMLEventElement<T extends HTMLElement> = Event & {
    target: T,
    currentTarget: T
}

export type ValueOf<T> = T[keyof T];