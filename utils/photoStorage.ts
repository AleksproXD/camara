import * as FileSystem from "expo-file-system";

const PHOTOS_DIR = `${FileSystem.documentDirectory}photos/`;

// Inicializar el directorio de fotos
export async function initPhotosDirectory() {
  const dirInfo = await FileSystem.getInfoAsync(PHOTOS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(PHOTOS_DIR, { intermediates: true });
    console.log("📁 Directorio de fotos creado");
  }
}

// Guardar una foto
export async function savePhoto(uri: string): Promise<string> {
  await initPhotosDirectory();
  
  const fileName = `photo_${Date.now()}.jpg`;
  const newPath = PHOTOS_DIR + fileName;
  
  console.log("💾 Guardando foto:", fileName);
  await FileSystem.copyAsync({
    from: uri,
    to: newPath,
  });
  
  console.log("✅ Foto guardada en:", newPath);
  return newPath;
}

// Obtener todas las fotos guardadas
export async function getAllPhotos(): Promise<string[]> {
  await initPhotosDirectory();
  
  console.log("📸 Buscando fotos en:", PHOTOS_DIR);
  const files = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
  
  const photoFiles = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
    .map(file => PHOTOS_DIR + file)
    .sort()
    .reverse(); // Más recientes primero
  
  console.log("✅ Fotos encontradas:", photoFiles.length);
  return photoFiles;
}

// Eliminar una foto
export async function deletePhoto(uri: string): Promise<void> {
  console.log("🗑️ Eliminando foto:", uri);
  await FileSystem.deleteAsync(uri, { idempotent: true });
  console.log("✅ Foto eliminada");
}

// Eliminar todas las fotos (útil para limpiar)
export async function deleteAllPhotos(): Promise<void> {
  const photos = await getAllPhotos();
  console.log("🗑️ Eliminando", photos.length, "fotos...");
  
  for (const photo of photos) {
    await FileSystem.deleteAsync(photo, { idempotent: true });
  }
  
  console.log("✅ Todas las fotos eliminadas");
}