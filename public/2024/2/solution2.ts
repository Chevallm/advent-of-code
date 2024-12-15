const MIN_STEP = 1;
const MAX_STEP = 3;

export default function solve(input: string) {

    const reports = transformInput(input);
    const validReports = reports.filter(report => isReportValid(report));
    return validReports.length;
}

function transformInput(input: string): number[][] {
    return input.split('\r\n').map(line => line.split(' ').map(n => parseInt(n)));
}

function isReportValid(report: number[]): boolean {
    let direction: 'ASC' | 'DESC' | undefined = undefined;
    let errors = 0;

    return report.every((current: number, index: number) => {
        const isLast = index === report.length - 1;
        if (isLast) {
            return true;
        }

        const next = report[index + 1];
        const difference = next - current;

        // is in the same direction ?
        if (!direction) {
            const directionIsAsc = difference > 0;
            direction = directionIsAsc ? 'ASC' : 'DESC';
        }

        let isInSameDirection = false;
        if (direction === 'ASC' && next > current) {
            isInSameDirection = true;
        }
        if (direction === 'DESC' && next < current) {
            isInSameDirection = true;
        }

        // Is in range ?
        const distance = Math.abs(difference);
        const isInRange = distance >= MIN_STEP && distance <= MAX_STEP;

        const reportIsValid = isInRange && isInSameDirection;
        if (!reportIsValid && errors < 1) {
            return true;
        } else {
            return reportIsValid;
        }
    });
}