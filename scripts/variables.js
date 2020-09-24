export const apiKey = "fIqIZpCyt2zeZ9jE83dOA4jVd5Du3GIK";
export const endpointTrending = "http://api.giphy.com/v1/gifs/trending";
export const endpointTrendingTag = "http://api.giphy.com/v1/trending/searches";
export const endpointSearch = "http://api.giphy.com/v1/gifs/search";
export const endpointAutocomplete = "http://api.giphy.com/v1/gifs/search/tags";
export const endpointGifById = "http://api.giphy.com/v1/gifs/";
export const tituloGenerico = "GIF animado";
export const nombreGenerico = "GIF";
export let arregloFavoritos = [];
export let constraints = { 
    audio: false, 
    video: {
        width: 400,
        height: 320,
    } 
};
export const endpointCargar = "http://upload.giphy.com/v1/gifs";