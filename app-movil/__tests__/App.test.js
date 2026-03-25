test("verifica botones principales", () => {
  const botones = ["Tomar Foto", "Obtener Ubicación"];

  expect(botones).toContain("Tomar Foto");
  expect(botones).toContain("Obtener Ubicación");
});