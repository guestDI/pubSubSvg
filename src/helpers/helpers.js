export function transformCoordinatesToString(coordinates) {
  const initialArray = coordinates.map(point => {
    return Object.values(point);
  });

  return initialArray.join(" ");
}

export function generateData(max = 20, min = 5) {
  const chartData = new Array(6)
    .fill(0)
    .map(
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );

  return chartData;
}