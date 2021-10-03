export function contiguousTo2D(idx: number, dim: number): [number, number] {
    return [Math.floor(idx / 3), idx % 3];
}
