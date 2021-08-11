import { Schema,model } from "mongoose"

export const Query = new Schema({
    name: String,
    datetime : Date
},{collection:"query"})


export default model("query",Query)