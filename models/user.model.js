const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Le prénon est obligatoire'],
      minLength: 3,
      maxLength: 80,
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      minLength: 3,
      maxLength: 80,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Le mail est obligatoire'],
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      max: 1024,
      minlength: 6,
      // select: false
    },
    role: {
      type: String,
      required: [true, 'Le role est obligatoire'],
      default: 'level-5',
      enum: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5"],
      // select: false
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    disjoncteurUser: [{
      // required: [true, 'Le est obligatoire'],
      type: mongoose.Schema.Types.ObjectId,
      ref: "disjoncteur"
    }],
    compteurUser: [{
      // required: [true, 'Le est obligatoire'],
      type: mongoose.Schema.Types.ObjectId,
      ref: "compteur"
    }],
    carUser: [{
      // required: [true, 'Le est obligatoire'],
      type: mongoose.Schema.Types.ObjectId,
      ref: "car"
    }],
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;