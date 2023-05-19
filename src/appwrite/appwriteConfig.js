import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64644be0417405334871");

export const account = new Account(client);

//Database

export const databases = new Databases(client);
