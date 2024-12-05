export default function solve(input: string) {

    const left: number[] = [];
    const right: number[] = [];

    // Split the input in two array
    input.split('\r\n').forEach(line => {
        const [a, b] = line.split('   ');
        left.push(parseInt(a));
        right.push(parseInt(b));
    });

    const locationCounter = new Map<number, number>();

    for (const locationIdInLeft of left) {
        if (!locationCounter.has(locationIdInLeft)) {
            locationCounter.set(locationIdInLeft, 0);
        }

        const locationIdOccurenceInRight = right.filter(
            locationIdInRight => locationIdInRight === locationIdInLeft
        ).length;

        const previousValue = locationCounter.get(locationIdInLeft)!;
        const nextValue = previousValue + locationIdInLeft * locationIdOccurenceInRight;
        locationCounter.set(locationIdInLeft, nextValue);
    }

    return Array.from(locationCounter).reduce((sum, [, locationValue]) => {
        return sum + locationValue;
    }, 0);
}