const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function loadData() {
  // Utiliser l'API si VITE_API_URL est défini (même vide = même origine)
  if (import.meta.env.VITE_API_URL !== undefined) {
    const [timelineData, galleryImages, textsData, familleData] =
      await Promise.all([
        fetch(API_URL + '/api/timeline').then((r) => r.json()),
        fetch(API_URL + '/api/gallery').then((r) => r.json()),
        fetch(API_URL + '/api/texts').then((r) => r.json()),
        fetch(API_URL + '/api/famille')
          .then((r) => r.json())
          .catch(() => ({ generations: [], persons: [] })),
      ])
    return {
      timelineData: timelineData || [],
      galleryImages: galleryImages || [],
      textsData: textsData || {},
      familleData: familleData?.persons?.length ? familleData : null,
    }
  }
  const [timelineModule, galleryModule, textsModule] = await Promise.all([
    import('./timelineData.js'),
    import('./galleryData.js'),
    import('./textsData.js'),
  ])
  return {
    timelineData: timelineModule.timelineData,
    galleryImages: galleryModule.galleryImages,
    textsData: textsModule.textsData,
    familleData: null,
  }
}
