const mongoose = require("mongoose");
const Equipment = require("./models/Equipment");

mongoose.connect("mongodb://127.0.0.1:27017/militaryDB");

async function seed(){

await Equipment.insertMany([
{ name:"Assault_Rifle"},
{ name:"Pistol"},
{ name:"Shootgun"},
{ name:"Machinegun"},
{name: "Grenade"},
{name: "Rocket_Launcher"}
]);

console.log("Bases added");
process.exit();
}
seed();