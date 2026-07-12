import {
    getBookmarks as getLocalBookmarks,
    toggleBookmark as toggleLocalBookmark,
    isBookmarked as isLocalBookmarked
} from "./bookmarkUtils";

import {
    getBookmarks as getCloudBookmarks,
    saveBookmark,
    removeBookmark
} from "../services/bookmarkService";


export const getBookmarks = async () => {

    const token = localStorage.getItem("token");

    if (token) {

        return await getCloudBookmarks();

    }

    return getLocalBookmarks();
};

export const isBookmarked = async (
    kand,
    verseId
) => {

    const token = localStorage.getItem("token");

    if (!token) {

        return isLocalBookmarked(
            kand,
            verseId
        );
    }

    const bookmarks =
        await getCloudBookmarks();

    return bookmarks.some(
        bookmark =>
            bookmark.verseId === verseId
    );
};

export const toggleBookmark = async (
    kand,
    verseId
) => {

    const token = localStorage.getItem("token");

    if (!token) {

        return toggleLocalBookmark(
            kand,
            verseId
        );
    }

    const bookmarks =
        await getCloudBookmarks();

    const exists =
        bookmarks.some(
            bookmark =>
                bookmark.verseId === verseId
        );

    if (exists) {

        await removeBookmark(
            verseId
        );

    } else {

        await saveBookmark(
            verseId
        );
    }

    return await getCloudBookmarks();
};