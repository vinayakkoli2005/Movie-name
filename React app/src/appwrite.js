import search from "./components/Search.jsx";

const PROJECT_ID= import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID= import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID= import.meta.env.VITE_APPWRITE_COLLECTION_DATABASE_ID;
const ENDPOINT= import.meta.env.VITE_APPWRITE_ENDPOINT;
import {Client,Databases,Query,ID} from 'appwrite'

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID)

const database = new Databases(client);

export const updatesearchcnt=async (searchTerm,movie)=>{
    // 1. Use appwrite sdk to check if search term exists in database
    // 2. if it does update the cnt
    // 3. if it doesnt, create a new document with the search tern and cnt as 1


    try {
        // 1. Check if search term exists
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('searchTerm', searchTerm)]
        );

        if (result.documents.length > 0) {
            // 2. Update count if exists
            const doc = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                doc.$id,
                {
                    count: doc.count + 1
                }
            );
        } else {
            // 3. Create new document if doesn't exist
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }
            );
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }

}

export const getTrendingMovies= async()=>{
    try{
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc("count")
            ]
        )
        return result.documents;

    }catch (e) {
        console.log(e.message);
    }
}