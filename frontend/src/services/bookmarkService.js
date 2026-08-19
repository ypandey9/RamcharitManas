import api from "./api";

// Save Bookmark
export const saveBookmark = async (verseId) => {

    const response = await api.post(
        `/api/bookmarks/${verseId}`
    );

    return response.data;
};

// Get My Bookmarks
export const getBookmarks = async () => {

    const response = await api.get(
        "/api/bookmarks"
    );

    return response.data;
};

// Remove Bookmark
export const removeBookmark = async (verseId) => {

    const response = await api.delete(
        `/api/bookmarks/${verseId}`
    );

    return response.data;
};

// Only bookmarked verses

export const getBookmarkedVerses = async () => {

    const response =
        await api.get("/api/bookmarks/verses");

    return response.data;
};