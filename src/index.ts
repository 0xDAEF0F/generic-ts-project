import { unwrap, unwrapOr, map, unsafeDivision, safeDivision } from './primitives'
import assert from 'assert'

async function main() {
    // *SIN LA OPCION DE RUST*
    let doubledQuotient // Se necesita reasignal esta variable despues.
    try {
        const myQuotient = unsafeDivision(42, 0)

        // Casi lo mismo que `map` ya que estamos transformando el resultado exitoso.
        doubledQuotient = myQuotient * 2
    } catch (e: any) {
        assert(e.message === 'division by zero.')

        // Lo mismo que `unwrapOr` (ya que estamos manejando el error)
        doubledQuotient = 69
    }

    // *CON LA OPCION DE RUST*
    //
    // EJEMPLO A
    const maybeQuotientA = safeDivision(42, 0)

    if (maybeQuotientA.kind === 'None') {
        // Esto significa division entre cero.
        // Aqui Podemos manejar el error.
    }

    // EJEMPLO B
    //
    // Ya que sabemos que la division es posible, podemos `unwrapear`
    // el valor con seguridad.
    const maybeQuotientB = safeDivision(42, 1)
    const quotientB = unwrap(maybeQuotientB)
    assert(quotientB === 42)

    // EJEMPLO C
    //
    // El valor predeterminado tomara lugar ya que esta ocurriendo una division
    // entre cero.
    const maybeQuotientC = safeDivision(42, 0)
    const quotientOrDefaultValueC = unwrapOr(maybeQuotientC, 69)
    assert(quotientOrDefaultValueC === 69)

    // EJEMPLO D
    //
    // `map` transformara el valor `Some` si es que lo existe,
    // de lo contrario seguira siendo `None`. Podemos `unwrapear` en
    // este ejemplo ya que sabemos que *no* es `None`.
    const maybeQuotientD = safeDivision(42, 1)
    const doubleIfPossible = map(maybeQuotientD, (x: number) => x * 2)
    const value = unwrap(doubleIfPossible)
    assert(value === 84)
}

main()
