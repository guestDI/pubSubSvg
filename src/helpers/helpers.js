export function transformCoordinatesToString(coordinates) {
  const initialArray = coordinates.map(point => {
    return Object.values(point);
  });

  return initialArray.join(" ");
}