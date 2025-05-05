import { getImages } from "@/types";
import { Client, Query, Storage } from "appwrite";

export const getAllImages = async ({ bucketId, nameIndex, folder } : getImages) => {

    const client = new Client();

    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_KEY ?? "") // Your project ID;

    const storage = new Storage(client);
    const response = await storage.listFiles(bucketId, folder ? [ Query.startsWith('name', folder) ] : [])

    const filteredFiles = response.files.filter(async (file) => {
      const parts = file.name.split(".")
      return parts.length === 2 && parts[0] === folder
    })

    const images = await Promise.all(
      filteredFiles.map(async file => {
        const url = storage.getFileView(bucketId, file.$id);
        const meta = await storage.getFile(bucketId, file.$id);
        const name = meta.name.split(".")[nameIndex];
        return { url, name };
      })
    );

    const imageUrls: string[] = images.map(img => img.url)
    const imageNames: string[] = images.map(img => img.name)

    return { imageUrls, imageNames }
}