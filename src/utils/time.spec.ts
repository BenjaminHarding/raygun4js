export function timestamp(hours: number): number {
    return Date.now() + hours * 60 * 1000;
}
