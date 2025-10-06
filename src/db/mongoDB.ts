// import { mongo_client } from "./mongoClient";

// export async function updateEmailList(email: string) {
//   const mongoClient = await mongo_client();
//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const result = await collection.updateOne(
//       { name: "emailList" },
//       { $addToSet: { emails: email } },
//       { upsert: true },
//     );

//     return result.acknowledged;
//   } finally {
//     await mongoClient.close();
//   }
// }

// export async function updateWalletAddressList(
//   walletAddress: string,
//   balance: number,
// ) {
//   const mongoClient = await mongo_client();
//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const result = await collection.updateOne(
//       { name: "walletAddressList" },
//       { $addToSet: { wallets: { address: walletAddress, balance } } },
//       { upsert: true },
//     );

//     return result.acknowledged;
//   } finally {
//     await mongoClient.close();
//   }
// }

// export async function getEmailList() {
//   const mongoClient = await mongo_client();
//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const document = await collection.findOne({ name: "emailList" });
//     return document?.emails || [];
//   } finally {
//     await mongoClient.close();
//   }
// }

// export async function getWalletAddressList() {
//   const mongoClient = await mongo_client();

//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const document = await collection.findOne({ name: "walletAddressList" });
//     return document?.wallets || [];
//   } finally {
//     await mongoClient.close();
//   }
// }

// export async function isWalletInList(walletAddress: string): Promise<boolean> {
//   const mongoClient = await mongo_client();
//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const document = await collection.findOne({
//       name: "walletAddressList",
//       wallets: { $elemMatch: { address: walletAddress } },
//     });
//     return !!document;
//   } finally {
//     await mongoClient.close();
//   }
// }

// export async function getWalletAddressListContents(): Promise<any> {
//   const mongoClient = await mongo_client();
//   try {
//     await mongoClient.connect();
//     const collection = mongoClient
//       .db("money_market_waitlist")
//       .collection("money_market_waitlist");

//     const document = await collection.findOne({ name: "walletAddressList" });
//     return document?.wallets || [];
//   } finally {
//     await mongoClient.close();
//   }
// }
