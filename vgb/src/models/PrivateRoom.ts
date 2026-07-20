import mongoose, { Schema, type HydratedDocument, type Model, Types } from "mongoose";

const privateRoomSchema = new Schema(
  {
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    roomCode: { type: String, required: true, unique: true, index: true },
    gridSize: { type: Number, default: 9 },
    /** Si défini, seul cet utilisateur peut rejoindre */
    targetUserId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export type PrivateRoomDoc = HydratedDocument<{
  hostId: Types.ObjectId;
  roomCode: string;
  gridSize: number;
  targetUserId: Types.ObjectId | null;
  createdAt: Date;
}>;

const PrivateRoom =
  (mongoose.models.PrivateRoom as Model<PrivateRoomDoc>) ||
  mongoose.model<PrivateRoomDoc>("PrivateRoom", privateRoomSchema);

export default PrivateRoom;
