import { type Option, some, none } from './types'

// BLOQUES PRIMITIVOS
export function unwrap<T>(opt: Option<T>): T {
    if (opt.kind === 'Some') return opt.value
    throw new Error('Called `unwrap` on a `None` value.')
}

export function unwrapOr<T>(opt: Option<T>, or: T): T {
    if (opt.kind === 'Some') return unwrap(opt)

    return or
}

export function map<T, U>(opt: Option<T>, f: (x: T) => U): Option<U> {
    if (opt.kind === 'None') return none

    const val = unwrap(opt)
    const withMapTransformation = f(val)

    return some(withMapTransformation)
}

// FUNCIONES
// FUNCION REGULAR QUE DIVIDE
export function unsafeDivision(numerator: number, denominator: number): number {
    if (denominator === 0) {
        // ??? We dont have a choice but to throw an error.
        throw new Error('division by zero.')
    } else {
        return numerator / denominator
    }
}

// FUNCION QUE FUNCIONA EN EL MUNDO DEL `OPTION` TYPE.
export function safeDivision(numerator: number, denominator: number): Option<number> {
    if (denominator === 0) return none

    return some(numerator / denominator)
}
