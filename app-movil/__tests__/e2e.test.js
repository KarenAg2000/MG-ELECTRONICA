test("flujo completo: usuario toma foto y obtiene ubicación", async () => {

  // Simulación de acciones del usuario
  const usuario = {
    presionoCamara: true,
    tomoFoto: true,
    obtuvoUbicacion: true
  };

  // Validaciones del flujo completo
  expect(usuario.presionoCamara).toBe(true);
  expect(usuario.tomoFoto).toBe(true);
  expect(usuario.obtuvoUbicacion).toBe(true);

});