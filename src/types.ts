export type Option<T> = Some<T> | None

type Some<T> = {
    kind: 'Some'
    value: T
}

type None = {
    kind: 'None'
}

// CONSTRUCTORS
export const none: None = { kind: 'None' }

export function some<T>(a: T): Some<T> {
    return {
        kind: 'Some',
        value: a,
    }
}
