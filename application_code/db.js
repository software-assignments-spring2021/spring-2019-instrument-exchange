const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// defining schemas for database
var date = new Date(Date.now());
var formattedDate = date.toString().split(" ");

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    phoneNumber: {type: Number, minlength: 10},
    dateRegistered: {type: Date, required: true},
    weekdayRegistered: {type: String, required: true},
    monthRegistered: {type: String, required: true},
    numDateRegistered: {type: String, required: true},
    yearRegistered: {type: String, required: true},
    timeRegistered: {type: String, required: true}
});

const InstrumentSchema = new Schema({
    name: {type: String, required: true},
    category: {
        type: String,
        enum: ["String", "Brass", "Woodwind", "Percussion", "Synthesizer"]
    },
    address: {type: String, required: true},
    weight: {type: Number, required: true},
    pictures: [String],
    coverPicture: {type: String, required: true},
    description: {type: String, required: true},
    rentalPrice: {type: Number, required: true},
    purchasePrice: {type: Number, required: true},
    inCart: {type: Boolean, default: false}
});

const StudioSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    pictures: [String],
    coverPicture: {type: String, required: true},
    description: {type: String, required: true},
    rentalPrice: {type: Number, required: true},
    inCart: {type: Boolean, default: false}
});

const RangeSchema = new Schema({
    start: {type: Date, default: Date.now()},
    end: {type: Date, default: Date.now()}
});

const InstrumentListingSchema = new Schema({
    instrumentId : {type: Schema.Types.ObjectId, ref: "Instrument"},
    sellerId: {type: Schema.Types.ObjectId, ref: "User"},
    booked: [RangeSchema] // array of date ranges
});

const StudioListingSchema = new Schema({
    studioId: {type: Schema.Types.ObjectId, ref:"Studio"},
    sellerId: {type: Schema.Types.ObjectId, ref:"User"},
    booked: [RangeSchema] // array of date ranges
});

const InstrumentTransactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ["Rental", "Purchase"]
    },
    instrumentId : {type: Schema.Types.ObjectId, ref: "Instrument"},
    buyerId: {type: Schema.Types.ObjectId, ref: "User"},
    sellerId: {type: Schema.Types.ObjectId, ref: "User"},
    rentalDateStart: {type: Date, default: Date.now()},
    rentalDateEnd: {type: Date, default: Date.now()},
    price: {type: Number, required: true}
});


const StudioTransactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ["Rental"],
    },
    studioId: {type: Schema.Types.ObjectId, ref:"Studio"},
    buyerId: {type: Schema.Types.ObjectId, ref: "User"},
    sellerId: {type: Schema.Types.ObjectId, ref: "User"},
    rentalDateStart: {type: Date, default: Date.now()},
    rentalDateEnd: {type: Date, default: Date.now()},
    price: {type: Number, required: true}
});

const ShoppingCartSchema = new Schema({
  buyerId: {type: Schema.Types.ObjectId, ref: "User"},
  studios: [StudioSchema],
  instruments: [InstrumentSchema]
})

// registering the models
const User = mongoose.model('User', UserSchema);
const Instrument = mongoose.model('Instrument', InstrumentSchema);
const Studio = mongoose.model('Studio', StudioSchema);
const InstrumentTransaction = mongoose.model('InstrumentTransaction', InstrumentTransactionSchema);
const StudioTransaction = mongoose.model('StudioTransaction', StudioTransactionSchema);
const InstrumentListing = mongoose.model('InstrumentListing', InstrumentListingSchema);
const StudioListing = mongoose.model('StudioListing', StudioListingSchema);
const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema)

module.exports = {
    User: User,
    Instrument: Instrument,
    Studio: Studio,
    InstrumentTransaction: InstrumentTransaction,
    StudioTransaction: StudioTransaction,
    InstrumentListing: InstrumentListing,
    StudioListing: StudioListing,
    ShoppingCart: ShoppingCart
};


// making connection to the database
let dbconf = "mongodb://localhost/InstrumentExchange";
mongoose.connect(dbconf, {useNewUrlParser: true, useCreateIndex: true})
    .then ( ()=> { console.log("MongoDB Connected"); })
    .catch( err => console.log(err));
