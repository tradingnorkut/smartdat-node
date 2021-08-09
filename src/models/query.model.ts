import { Schema,model } from "mongoose"

const Query = new Schema({
    name: String,
    datetime : Date
},{collection:"query"})


export default model("query",Query)