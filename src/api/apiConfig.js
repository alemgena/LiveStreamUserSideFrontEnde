const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '6a98b470521d40e2b2b44642e8d3e937',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;