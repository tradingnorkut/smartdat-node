import {model, Schema} from "mongoose"

const Instrument = new Schema({
    name: String,
    stop: Number,
    sell: Number,
    buy: Number,
    query: { type: Schema.Types.ObjectId, ref: 'query' }
},{collection: "instrument" })

export default model("instrument", Instrument)