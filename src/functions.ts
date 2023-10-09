import { type Option, some, none } from './types'

export function unsafeDivision(numerator: number, denominator: number): number {
    if (denominator === 0) {
        // ??? We dont have a choice but to throw an error.
        throw new Error('division by zero.')
    } else {
        return numerator / denominator
    }
}

export function safeDivision(numerator: number, denominator: number): Option<number> {
    if (denominator === 0) return none

    return some(numerator / denominator)
}
