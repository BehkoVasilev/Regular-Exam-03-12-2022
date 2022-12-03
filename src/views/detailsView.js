import { delAlbumById, getAlbumById } from "../api/data.js";
import { getLikes, getOwnLike, like } from "../api/likes.js";
import { html } from "../lib.js"

const detailsTemplate = (album, likes, hasUser, canLike, isOwner, onDelete, onLike) => html` 
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="./images/BackinBlack.jpeg" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>

        ${albumControl(album, likes, hasUser, canLike, isOwner, onDelete, onLike)}

    </div>
</section>`;

function albumControl(album, likes, hasUser, canLike, isOwner, onDelete, onLike) {

    if (hasUser == false) {
        return html`<div id="likes">Likes: <span id="likes-count">${likes}</span></div>`
    }

    if (canLike) {
        return html`<div id="likes">Likes: <span id="likes-count">${likes}</span></div>
                    <div id="action-buttons">
                         <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
                    </div>`;
    }

    if (isOwner) {
        return html`
                <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
                <div id="action-buttons">
                    <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>`
    }

    return html`
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>`
}

export async function showDetails(ctx) {
    const albumId = ctx.params.id;
    const requests = [
        getAlbumById(albumId),
        getLikes(albumId)
    ]
    const hasUser = !!ctx.user;

    if (hasUser) {
        requests.push(getOwnLike(albumId, ctx.user._id))
    }
    const [album, likes, hasLike] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id === album._ownerId;
    const canLike = !isOwner && hasLike == 0;

    ctx.render(detailsTemplate(album, likes, hasUser, canLike, isOwner, onDelete, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this book?');
        if (choice) {
            await delAlbumById(albumId);
            ctx.page.redirect("/catalog")
        }

    }

    async function onLike() {
        await like(albumId);
        ctx.page.redirect("/details/" + albumId)
    }

}