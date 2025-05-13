import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required:true},
    title: { type: String, required:false},
    role: { type: String, required:false},
    email: { type: String, required:true, unique:true },
    password: { type: String, required: true },
    telephone: { type: String, required: false },
    location: { type: String, required: false },
    //isAdmin: { type: Boolean, required:true, default: false },
    tasks: [{type: Schema.Types.ObjectId, ref:"Task"}],
    isActive: { type: Boolean, required:false, default: true },
    bio: { type: String, required: false }, // ← burası yeni
    avatar: { type: String, default: "" },

    socialLinks: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" }
    },
    showSocialLinks: { type: Boolean, default: false },

    showEmail: { type: Boolean, default: true },
    showTelephone: { type: Boolean, default: false },
    showLocation: { type: Boolean, default: false },

      
},{ timestamps: true }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);


export default User;