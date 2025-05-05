import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
    {
        team: [{ type: Schema.Types.ObjectId, ref: "User"}],
        text: { type: String },
        task: { type: Schema.Types.ObjectId, ref:"Task"},
        notiType: { type:String, default: "alert", enum: ["alert","message","join_request","info", "rejected"]},
        isRead: [{ type: Schema.Types.ObjectId, ref: "User"}],
        senderId: { type: Schema.Types.ObjectId, ref: "User" },
        projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    },
    { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;