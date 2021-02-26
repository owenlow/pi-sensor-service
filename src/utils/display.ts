type RgbArray = [number, number, number];
type CoordinatePair = [number, number];

export function hexTripletStringToRgbArray(hexString: string): RgbArray {
    const hexValue = parseInt(hexString.slice(1), 16); // Assuming the hex string starts with '#'
    const r = (hexValue & 0xff0000) >> 16;
    const g = (hexValue & 0x00ff00) >> 8;
    const b = hexValue & 0x0000ff;
    return [r, g, b];
}

export function indexTo2dCoords(
    index: number,
    gridSize: number
): CoordinatePair {
    const x = index % gridSize; // column
    const y = (index - x) / gridSize; // row
    return [x, y];
}