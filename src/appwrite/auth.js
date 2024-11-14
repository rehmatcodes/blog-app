import conf from "../conf.js";
import {Client,Account,ID} from 'appwrite'

export class AuthService {
    Client  = new Client();
    account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojetId);
        this.account = new Account (this.Client);
    }

    async createAccount ({email,password,name}){
        try {
         const userAccount =  await this.account.create(ID.unique(),  email,password,name);
         if (userAccount) {
            //call another methood
          return   this.login ({email,password});

         } else {
            return userAccount;
         }
        } catch (error) {
            throw error;
        }
    }

    async login ({email,password}){
        try {
        return  await this.account.createEmailSession(email,password);

        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
             return  await  this.account.get();
        } catch (error) {
            console.log('appwrite service :: getcurrentuser @@ error', error);   
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions('current');
        } catch (error) {
            console.log('appwrite service :: logout::error',error);
            
        }
    }

    async login(){
        await this.account.deleteIdentity
    }
}

const authservice = new AuthService();

export default authservice ;