import dotenv from "dotenv";
import { ethers } from "ethers";
import contractData from "./GreenHydrogenSubsidy.json" assert { type: "json" };

// Load environment variables (never hardcode private keys in code)
dotenv.config();

// Extract ABI from the compiled contract
const ABI = contractData.abi;

// Your deployed contract address on Sepolia
const CONTRACT_ADDRESS = "0x6888c3cb445a389c56f07ebd4de95bea62e9432f";

// Connect to Sepolia testnet via Infura
// (You could also use Alchemy, QuickNode, or your own RPC URL)

// Use Sepolia RPC
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/0de21a083f1b4b1d9ed80b65374f58fb"
);
// Create a wallet (signer) using your private key and connect to provider
// The wallet is needed for sending transactions that modify blockchain state
const wallet = new ethers.Wallet('4e445f1714e6babf1f6c6799623ccf9e9dc81d567ec8d3b1e193f9c4e4eacdc6', provider);

// Create a contract instance to interact with our deployed smart contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

/**
 * 1) Add funds to the contract
 * Anyone can call this since we removed the government restriction.
 */
async function addFunds() {
  try {
    const tx = await contract.addFunds({
      value: ethers.parseEther("0.01"), // Sending 0.01 ETH
    });
    console.log("⛽ Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Funds added, confirmed in block:", receipt.blockNumber);
  } catch (err) {
    console.error("❌ Error adding funds:", err);
  }
}

/**
 * 2) Get the contract’s ETH balance
 * This is a read-only function (free, no gas required).
 */
// async function getBalance() {
//   try {
//     const balance = await contract.getBalance();
//     console.log("💰 Contract balance:", ethers.formatEther(balance), "ETH");
//   } catch (err) {
//     console.error("❌ Error fetching balance:", err);
//   }
// }

/**
 * 3) Approve a company (Only government wallet can do this)
 * If another wallet calls it, it will revert with "Only government can approve".
 */
async function approveCompany(walletAddress, companyName) {
  try {
    const tx = await contract.approveCompany(walletAddress, companyName);
    console.log("🏢 Approve transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Company approved in block:", receipt.blockNumber);
  } catch (err) {
    console.error("❌ Error approving company:", err);
  }
}

/**
 * 4) Fetch a company’s details (read-only)
 */
async function getCompany(walletAddress) {
  try {
    const company = await contract.companies(walletAddress);
    console.log("🏭 Company details:");
    console.log("   Name:", company.name);
    console.log("   Wallet:", company.wallet);
    console.log("   Approved:", company.approved);
  } catch (err) {
    console.error("❌ Error fetching company:", err);
  }
}

// ======================
// DEMO RUN
// ======================
(async () => {
  console.log("🚀 Hydrogen Fund Interaction Started");

  // 1. Add funds
  await addFunds();

  // 2. Check balance

  // 3. Approve a company (ONLY works if wallet == government)
  await approveCompany("0x1234567890abcdef1234567890abcdef12345678", "GreenCo");

  // 4. Fetch company details
  await getCompany("0x1234567890abcdef1234567890abcdef12345678");
})();


// Create wallet from env

// Contract instance

