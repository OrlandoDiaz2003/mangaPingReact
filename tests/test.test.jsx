 // test/smoke.test.jsx

// describe: Agrupa tests y les da un nombre
describe('Smoke Test para Karma y Jasmine', () => {

  // it: Define un test individual (una "especificación")
  it('debe verificar que true es igual a true (prueba de funcionamiento)', () => {
    // expect: La aserción, lo que esperas que sea verdad
    expect(true).toBe(true);
  });

  // Este test fallará a propósito para ver el reporte de errores
  it('debe verificar que la suma de 1 + 1 es 2', () => {
    const resultado = 1 + 1;
    expect(resultado).toEqual(2);
    // Cambia el expect(resultado).toEqual(3); para ver un error
  });

});
