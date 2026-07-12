import api from "./api";

export const getReadingPage = async (verseId) => {

    const response = await api.get(

        `/api/verses/read/${verseId}`

    );

    return response.data;

};