// TIPOS
export type Option<T> = Some<T> | None

type Some<T> = {
    kind: 'Some'
    value: T
}

type None = {
    kind: 'None'
}

// CONSTRUCTORES DE LOS TIPOS (SON SOLO OBJETOS — NO SE ASUSTEN)
export const none: None = { kind: 'None' }

export const some = <T>(a: T): Some<T> => ({
    kind: 'Some',
    value: a,
})
