const formatCoords = (lat, lon) => {
  return `Lat: ${lat}, Lon: ${lon}`;
};

const validatePermission = (status) => {
  if (status === "granted") return true;
  if (status === "denied") return false;
  throw new Error("Estado inválido");
};

module.exports = { formatCoords, validatePermission };