export async function fetchIfFolderExists(selectedFolder){
    const response = await fetch(`https://localhost:7017/api/Folder/folderExists/${selectedFolder}`);
    return await response.json();
}