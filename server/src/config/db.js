import dns from "dns";
import mongoose from "mongoose";
import { env } from "./env.js";

// Node 18+ prefers IPv6 by default when resolving hostnames. On many Windows
// machines/routers, IPv6 routing to Atlas is broken or hangs instead of
// failing fast — this is a very common cause of "Could not connect to any
// servers" even when DNS (nslookup) and the TCP port itself are both fine.
dns.setDefaultResultOrder("ipv4first");

// Node uses its own internal DNS resolver (c-ares) for SRV lookups — NOT
// Windows' resolver, which is what `nslookup` uses. On machines with a VPN
// client, Docker Desktop, WSL2, or VMware/VirtualBox installed, the extra
// virtual network adapters they add can confuse Node's resolver into sending
// queries nowhere, causing "querySrv ECONNREFUSED" even though `nslookup`
// (using Windows' own resolver) works perfectly fine. Pointing Node directly
// at Google's public DNS bypasses that confusion entirely.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connectDB() {
  if (!env.mongoUri) {
    console.warn("⚠️  MONGO_URI not set — running without a database connection (Stage 3 mode).");
    return;
  }
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
