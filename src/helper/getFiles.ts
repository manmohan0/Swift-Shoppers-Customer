import { Client, Storage } from "appwrite";
export const getAllImages = async (bucketId:string) => {

    const client = new Client();

    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_KEY ?? "") // Your project ID;

    const storage = new Storage(client);
    const response = await storage.listFiles(bucketId)
    const imageUrls: string[] = []

    response.files.forEach(file => {
        const url = storage.getFileView(bucketId, file.$id)
        imageUrls.push(url)
    })

    return imageUrls
}