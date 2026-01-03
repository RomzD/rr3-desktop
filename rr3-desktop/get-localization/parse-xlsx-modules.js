import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';

XLSX.set_fs(fs);

const FILE_FORMAT = 'js'

export async function fetchFile(URL) {
    try {
        const file = await fetch(URL);
        if (!file.ok) {
            throw (new Error(`Could not find file "${URL}"`));
        }
        return await file.arrayBuffer();
    } catch (error) {
        console.error('fetchFile ->', error);
        return null;
    }
}

export async function readFile(arrayBuffer) {
    try {
        const workbook = XLSX.read(arrayBuffer);
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        return sheetData;
    } catch (error) {
        console.log('readFile ->', error)
        return null;
    }
}

export function createJSONs(rawFileData, fileNames, keyHeader) {
    try {
        const jsons = fileNames.map((fileName) => ({name: fileName, data: {}}));
        const assignProp = (data, accessors, value) => {
            for (let i = 0; i < accessors.length; i++) {
                const accessor = accessors[i];
                if (accessors.length !== i + 1) {
                    data = !data[accessor] ? data[accessor] = {} : data[accessor];
                }
                if (accessors.length === i + 1) {
                    data[accessor] = value;
                }

            }
        }

        for (const row of rawFileData) {
            const accessors = row[keyHeader].split('.');

            jsons.forEach(json => {
                assignProp(json.data, accessors, row[json.name])
            })
        }

        return jsons;
    } catch (error) {
        console.log('createJSONs ->', error);
        return null;
    }
}

export function getJSONFileNames(rawFileData, excludeKeys = []) {
    try {
        return Object.keys(rawFileData[0]).filter(key => !excludeKeys.includes(key));
    } catch (error) {
        console.log('getJSONFileNames ->', error);
    }
}

export function strigifyAndWrite(jsons, dir) {
    try {
        console.log('strigifyAndWrite', jsons, 'write')
        for (const json of jsons) {
            const localeName = json.name.toLowerCase();
            fs.writeFileSync(dir + localeName + `.${FILE_FORMAT}`, `export const ${localeName}=${JSON.stringify(json.data)}`);
        }

    } catch (error) {
        console.log('strigifyAndWrite ->', error);
    }
}


export function log(text) {
    console.log(text);
}