import { unwrap, unwrapOr, map, unsafeDivision, safeDivision } from './primitives'
import assert from 'assert'

async function main() {
    // *WITHOUT RUST OPTION TYPE*
    let doubledQuotient // You need to reassign it later.
    try {
        const myQuotient = unsafeDivision(42, 0)

        // The same as `map` since we are transforming the successful value.
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
        // This means division by zero.
        // You can handle the error gracefully now.
    }

    // EXAMPLE B
    //
    // Since we know division is possible, you can `unwrap` safely.
    const maybeQuotientB = safeDivision(42, 1)
    const quotientB = unwrap(maybeQuotientB)
    assert(quotientB === 42)

    // EXAMPLE C
    //
    // Default value will be chosen because there is division by zero — Error.
    const maybeQuotientC = safeDivision(42, 0)
    const quotientOrDefaultValueC = unwrapOr(maybeQuotientC, 69)
    assert(quotientOrDefaultValueC === 69)

    // EXAMPLE D
    //
    // Map will transform the `Some` value if there is one,
    // if not it will still be `None`. We can unwrap in this example
    // because we know it is *not* `None`.
    const maybeQuotientD = safeDivision(42, 1)
    const doubleIfPossible = map(maybeQuotientD, (x: number) => x * 2)
    const value = unwrap(doubleIfPossible)
    assert(value === 84)
}

main()
