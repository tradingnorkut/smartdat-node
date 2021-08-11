import {model, Schema} from "mongoose"

const Params  = new Schema({
    stop: String,
    sell: String,
    buy: String
})

const Calc  = new Schema({
    params:[ Params ],
    status:Number

})

const Calcs = new Schema({
    data : [ Calc ]
})

const Point  = new Schema({
    datetime: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    calcs : Calcs,
    instrument: { type: Schema.Types.ObjectId, ref: 'instrument' }
},{collection: "point" })

export default model("point", Point)