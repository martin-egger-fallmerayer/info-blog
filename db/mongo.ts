import { MongoClient } from "mongodb";

const uri = `mongodb://mongo:mongo@192.168.1.167:27017/?authSource=bsuff-db&readPreference=primary&ssl=false`;

const mongoClient = new MongoClient(uri);

mongoClient.connect();
const db = mongoClient.db("bsuff-db");

const mongo = {
  cocktails: db.collection("cocktails"),
};

export default mongo;
