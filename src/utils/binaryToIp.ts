export function binaryToIp(binary: number): string {
    return [
        (binary >>> 24) & 0xFF,
        (binary >>> 16) & 0xFF,
        (binary >>> 8) & 0xFF,
        binary & 0xFF
    ].join('.');
}