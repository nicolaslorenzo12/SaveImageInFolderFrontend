import config from "../Config";

export async function fetchLastFiveImages(selectedFolder){
    const response = await fetch(`${config.apiBaseUrl}/Image/${selectedFolder}`);
    return await response.json();
}