import { type Option, some, none } from './types'

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
