const { formatCoords, validatePermission } = require("../hooks/useUtils");

test("formatea coordenadas", () => {
  expect(formatCoords(10, 20)).toBe("Lat: 10, Lon: 20");
});

test("permiso granted", () => {
  expect(validatePermission("granted")).toBe(true);
});

test("permiso denied", () => {
  expect(validatePermission("denied")).toBe(false);
});

test("error en permiso inválido", () => {
  expect(() => validatePermission("otro")).toThrow();
});