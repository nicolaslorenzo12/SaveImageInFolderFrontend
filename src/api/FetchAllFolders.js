import config from "../Config";

export async function fetchAllFolders(){
    const response = await fetch(`${config.apiBaseUrl}/Folder`);
    return await response.json();
}