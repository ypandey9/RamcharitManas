const STORAGE_KEY = "ramayan_custom_data";

// Get all verses
export const getCustomVerses = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];
};

// Save all verses
export const saveCustomVerses = (data) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

// Delete verse
export const deleteCustomVerse = (id) => {

  const verses = getCustomVerses();

  const updated = verses.filter(
    item => item.verse.id !== id
  );

  saveCustomVerses(updated);

  return updated;
};

export const getVerseById = (id) => {

  const verses = getCustomVerses();

  return verses.find(
    item => item.verse.id === Number(id)
  );
};

export const updateCustomVerse = (
  id,
  updatedVerse
) => {

  const verses = getCustomVerses();

  const updated = verses.map((item) => {

    if (item.verse.id === Number(id)) {

      return {
        ...item,
        verse: {
          ...updatedVerse
        }
      };
    }

    return item;
  });

  saveCustomVerses(updated);

  return updated;
};