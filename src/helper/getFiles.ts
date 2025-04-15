import { getImages } from "@/types";
import { Client, Query, Storage } from "appwrite";

export const getAllImages = async ({ bucketId, nameIndex, folder } : getImages) => {

    const client = new Client();

    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_KEY ?? "") // Your project ID;

    const storage = new Storage(client);
    const response = await storage.listFiles(bucketId, folder ? [ Query.startsWith('name', folder) ] : [])

    const imageUrls: string[] = []
    const imageNames: string[] = []

    response.files.forEach(async file => {
        const url = storage.getFileView(bucketId, file.$id)
        imageUrls.push(url)

        const img = await storage.getFile(bucketId, file.$id)
        const name = img.name.split(".")[nameIndex]
        imageNames.push(name)
        
    })

    return { imageUrls, imageNames }
}