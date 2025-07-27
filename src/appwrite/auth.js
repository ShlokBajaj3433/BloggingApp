import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            // This is correct: `create` is for new accounts and needs a unique ID.
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // If account creation is successful, log the user in.
                return this.login({email, password});
            } else {
               return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            // FIX: The correct method to log in is `createEmailPasswordSession`.
            // The error you're seeing proves that the wrong method was being called.
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: No current user");
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;