import app from "./app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 VaultIQ API Server running on port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`🤖 ML Prediction Engine: ONLINE`);
  console.log(`===========================================`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("VaultIQ Server terminated.");
  });
});
