import config from "../Config";

export async function fetchIfFolderExists(selectedFolder){
    const response = await fetch(`${config.apiBaseUrl}/Folder/folderExists/${selectedFolder}`);
    return await response.json();
}