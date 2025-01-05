import mongoose from "mongoose"

const userReportSchema = new mongoose.Schema({
        ip: {type:String,unique:true},
        visits: Number,
        firstVisit: Date,
        lastVisit: Date,
        resourceVisits: [
            { resource: mongoose.Schema.Types.ObjectId, count: Number, timestamps: [Date] }
        ],
        profileVisits: [
            { user: mongoose.Schema.Types.ObjectId, count: Number }
        ],
        location: {
            country: String,
            region: String,
            city: String
        },
        device: {
            browser: String,
            os: String
        },
        referrer: String,
        userid:String, //if it is logged in then it will have the id
});


export const UserReport = mongoose.model("userReport", userReportSchema);
