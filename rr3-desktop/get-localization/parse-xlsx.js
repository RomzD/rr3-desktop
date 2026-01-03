import {createJSONs, fetchFile, getJSONFileNames, readFile, strigifyAndWrite} from "./parse-xlsx-modules.js";
import * as path from 'path';

const FILE_URL = 'https://docs.google.com/spreadsheets/d/1xYlNRC6FKKo0AT9SlyJm18WWthPLmEa7O9GqtjbVi4s/export?format=xlsx';
const KEY_HEADER = 'KEY';
const DIR = path.join('../', 'src/', 'locales/');
console.log('ENTER ->', DIR);

Main();

async function Main() {
    const arrayBuffer = await fetchFile(FILE_URL)
    if (!arrayBuffer) {
        return;
    }

    const parsedData = await readFile(arrayBuffer);

    if (!parsedData) {
        return;
    }

    const fileNames = getJSONFileNames(parsedData, [KEY_HEADER]);
    const objectsForJSONs = createJSONs(parsedData, fileNames, KEY_HEADER);
    if (!objectsForJSONs) {
        return;
    }
    strigifyAndWrite(objectsForJSONs, DIR)
}

