import { unwrap, unwrapOr, map } from './primitives'
import { unsafeDivision, safeDivision } from './functions'

import assert from 'assert'
import * as dotenv from 'dotenv'
dotenv.config()

async function main() {
    // *WITHOUT RUST'S OPTION TYPE*
    let doubledQuotient
    try {
        const myQuotient = unsafeDivision(42, 0)
        // The same as `map` since we are transforming the value.
        doubledQuotient = myQuotient * 2
    } catch (e: any) {
        assert(e.message === 'division by zero.')
        // The same as `unwrapOr` (we are handling the error)
        doubledQuotient = 69
    }

    // *WITH RUST'S OPTION TYPE*
    //
    // EXAMPLE A
    const maybeQuotientA = safeDivision(42, 0)

    if (maybeQuotientA.kind === 'None') {
        // this means division by zero.
        // you can handle error now
        // or do something else like reassigment.
    }

    // EXAMPLE B
    //
    // since division is possible, unwrapping as well.
    const maybeQuotientB = safeDivision(42, 1)
    const quotientB = unwrap(maybeQuotientB)
    assert(quotientB === 42)

    // EXAMPLE C
    //
    // default value will be chosen because there is division by zero and thus an error.
    const maybeQuotientC = safeDivision(42, 0)
    const quotientOrDefaultValueC = unwrapOr(maybeQuotientC, 69)
    assert(quotientOrDefaultValueC === 69)

    // EXAMPLE D
    const maybeQuotientD = safeDivision(42, 1)
    const doubleIfPossible = map(maybeQuotientD, (x: number) => x * 2)
    const value = unwrap(doubleIfPossible)
    assert(value === 84)
}

main()
