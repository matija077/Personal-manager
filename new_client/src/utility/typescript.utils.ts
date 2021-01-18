export type HTMLEventElement<T extends HTMLElement> = Event & {
    target: T,
    currentTarget: T
}