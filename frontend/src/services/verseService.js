import api from "./api";

// GET ALL
export const getAllVerses = async () => {

  const response =
    await api.get("/api/verses");
  return response.data;
};

// GET BY ID
export const getVerseById = async (id) => {

  const response =
    await api.get(
      `/api/verses/${id}`
    );

  return response.data;
};

// ADD
export const addVerse = async (verse) => {

  const response =
    await api.post("/api/verses",
      verse
    );

  return response.data;
};

// UPDATE
export const updateVerse = async (
  id,
  verse
) => {

  const response =
    await api.put(
      `/api/verses/${id}`,
      verse
    );

  return response.data;
};

// DELETE
export const deleteVerse = async (id) => {

  const response =
    await api.delete(
      `/api/verses/${id}`
    );

  return response.data;
};

//serach verse

export const searchVerses = async (
  query,
  page = 0,
  size = 5
) => {

  const response =
    await api.get(
      "/api/verses/search/text",
      {
        params: {
          query,
          page,
          size
        }
      }
    );

  return response.data;
};



// pagination

export const getPagedVerses = async (
  page = 0,
  size = 5
) => {

  const response =
    await api.get(
      "/api/verses/paged",
      {
        params: {
          page,
          size
        }
      }
    );

  return response.data;
};

//dashbasestats

export const getDashbaseStats=async()=>{

  const response= await api.get(
    "/api/verses/stats"
  );

  return response.data;

};

export const getVerseNavigation=async(id)=>{
  const response= await api.get(
    `/api/verses/${id}/navigation`
  );
  return response.data;
};


// PAGINATION - VERSES BY KAND
export const getPagedVersesByKand = async (
  kand,
  page = 0,
  size = 5
) => {

  const response =
    await api.get(
      `/api/verses/kand/${kand}`,
      {
        params: {
          page,
          size
        }
      }
    );
  return response.data;
};