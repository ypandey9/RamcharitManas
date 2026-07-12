import api  from './api';

//save reading progress

export const saveReadingProgress=async (kand,verseId)=>{
    const response= await api.post(`/api/reading-progress?kand=${kand}&verseId=${verseId}`);
    return response.data;
};

// get reading progress

export const getReadingProgress=async ()=>{
    const response= await api.get(`/api/reading-progress`);
    return response.data;
};