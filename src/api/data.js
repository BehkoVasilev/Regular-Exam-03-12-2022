import { del, get, post, put } from "./api.js";



export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getAlbumById(id) {
    return get("/data/albums/" + id)
}

export async function delAlbumById(id) {
    return del("/data/albums/" + id);
}

export async function addAlbum(albumData) {
    return post("/data/albums", albumData)
}

export async function editAlbum(id, albumData) {
    return put("/data/albums/" + id, albumData)
}


