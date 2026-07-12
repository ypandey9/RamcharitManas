const BOOKMARKS_KEY = 'ramayan_bookmarks';

// Get all bookmarks from localStorage

export const getBookmarks = () => {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return  bookmarks ? JSON.parse(bookmarks) : [];
};

// Add a new bookmark

export const saveBookmarks = (bookmarks) => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

// CHECK IF A BOOKMARK EXISTS

export const isBookmarked = (kand, verseId) => {

  const bookmarks = getBookmarks();

  return bookmarks.some(
    (b) =>
      b.kand === kand &&
      b.verseId === verseId
  );
};

// TOGGLE BOOKMARK

export const toggleBookmark = (kand, verseId) => {
    const bookmarks = getBookmarks();
    const exists = bookmarks.some((b) => b.verseId === verseId);
    
    let updated;

    if(exists) {
        updated=bookmarks.filter((b) => !(b.kand===kand && b.verseId === verseId));
    } else {
        updated=[...bookmarks,{kand, verseId}];
    }

    saveBookmarks(updated);
    return updated;
}; 

