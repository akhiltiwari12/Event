import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log(`Port is listen on ${process.env.PORT}`);
});
