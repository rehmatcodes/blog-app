import conf from "../conf.js";
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client;
    Databases;
    bucket;
    

    constructor() {
        // Initialize Appwrite client
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojetId);

        // Initialize Databases and Storage with client
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            throw error;
        }
    }

    async updatePost( slug,{ title, content, featuredImage, status }) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // assuming 'slug' is the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error', error);
            throw error;
        }
    }

    async deletePost(slug,){
        try {
          await this.Databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
          )
          return true;
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            throw error;
           return  false;
        }
    }
    async getPost(slug,){
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            throw error;
            return false;
        }
    }

    async getPosts (queries = [Query.equal('status','active')]){
      try {
        return await  this.Databases.listDocuments(
            comf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        
        )
      } catch (error) {
        console.log('Appwrite service :: createPost :: error', error);
        throw error;
        return false;
      }
    }
    //fle up,oad service 

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebuckettId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            throw error;
            return false;
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                comf.appwritebuckettId,
                fileId  
            )
            return true;
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            throw error;
            return false;
        }
    }

    getfilepreview(fileId){
      return this.bucket.getFilePreview(
        conf.appwritebuckettId,
        fileId
      )

    }
    
}

const service = new Service();
export default service;
