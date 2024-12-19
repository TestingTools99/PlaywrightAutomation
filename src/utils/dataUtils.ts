import * as fs from 'fs';
import * as path from 'path';

export function getTestData(fileName: string): any {
    // Adjust the path to match your folder structure
    const dataPath = path.resolve(__dirname, '../tests/testData', fileName);
    console.log("Resolved path:", dataPath); // Debug the resolved path
    if (!fs.existsSync(dataPath)) {
        throw new Error(`File not found at ${dataPath}`);
    }
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}