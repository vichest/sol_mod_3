import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";

(async () => {
  // Step 1: Connect to cluster and generate two new Keypairs
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // const fromWallet = Keypair.generate();
  const skey = new Uint8Array([
    38, 216, 156, 215, 234, 190, 113, 45, 101, 242, 113, 96, 215, 15, 47, 166,
    173, 3, 145, 230, 176, 187, 139, 12, 153, 126, 19, 56, 102, 112, 150, 52,
    246, 155, 43, 196, 54, 51, 114, 127, 74, 49, 244, 78, 188, 198, 82, 155,
    218, 58, 176, 67, 124, 181, 144, 162, 163, 51, 18, 198, 231, 39, 107, 205,
  ]);
  const toWallet = Keypair.fromSecretKey(skey);

  // Step 2: Airdrop SOL into your from wallet
  // const fromAirdropSignature = await connection.requestAirdrop(
  //   fromWallet.publicKey,
  //   LAMPORTS_PER_SOL
  // );
  // // Wait for airdrop confirmation
  // await connection.confirmTransaction(fromAirdropSignature, {
  //   commitment: "confirmed",
  // });

  // Step 3: Create new token mint and get the token account of the fromWallet address
  //If the token account does not exist, create it
  const mint = await createMint(
    connection,
    toWallet,
    toWallet.publicKey,
    null,
    9
  );
  console.log(`token address: ${mint}`);
  console.log(`owner wallet address: ${toWallet.publicKey}`);
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    toWallet,
    mint,
    toWallet.publicKey
  );

  //Step 4: Mint a new token to the from account
  let signature = await mintTo(
    connection,
    toWallet,
    mint,
    fromTokenAccount.address,
    toWallet.publicKey,
    1000000000 * 10,
    []
  );
  console.log("mint tx:", signature);

  //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
  // const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   fromWallet,
  //   mint,
  //   toWallet.publicKey
  // );
  // console.log("sender account adddress :" + toWallet.publicKey);

  //Step 6: Transfer the new token to the to-wallet's token account that was just created
  // Transfer the new token to the "toTokenAccount" we just created
  // signature = await transfer(
  //   connection,
  //   fromWallet,
  //   fromTokenAccount.address,
  //   toTokenAccount.address,
  //   fromWallet.publicKey,
  //   1000000000 * 10,
  //   []
  // );
  // console.log("transfer tx:", signature);
})();
