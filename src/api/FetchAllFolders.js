export async function fetchAllFolders(){
    const response = await fetch('https://localhost:7017/api/Folder');
    return await response.json();
}