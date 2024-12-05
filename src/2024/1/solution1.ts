export default function solve(input: string) {

    const left: number[] = [];
    const right: number[] = [];

    // Split the input in two array
    input.split('\r\n').forEach(line => {
        const [a, b] = line.split('   ');
        left.push(parseInt(a));
        right.push(parseInt(b));
    });

    // Sort both
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // Calculate the absolute difference between left and right and add it to total distance
    let totalDistance = 0;
    left.forEach((leftInt, index) => {
        const rightInt = right.at(index)!;
        const distance = Math.abs(leftInt - rightInt);
        totalDistance = totalDistance + distance;
    });

    return totalDistance;
}