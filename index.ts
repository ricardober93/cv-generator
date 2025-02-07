import app from "./server/app";

const server =  Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch: app.fetch,
})

console.log("Server running at http://localhost:3000/");
