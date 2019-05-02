const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// defining schemas for database
var date = new Date(Date.now());
var formattedDate = date.toString().split(" ");

const RangeSchema = new Schema({
    start: {type: Date, default: Date.now()},
    end: {type: Date, default: Date.now()}
});

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: Number, required: true},
    password: {type:String, required: true},
    address: {type: String, required: true},
    zip: {type:String, required: true},
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
    zip: {type:String, required: true},
    weight: {type: Number, required: true},
    pictures: [String],
    coverPicture: {type: String, required: true},
    description: {type: String, required: true},
    rentalPrice: {type: Number, required: true},
    purchasePrice: {type: Number, required: true},
    isRental: {type: Boolean, default: false},
    startDate: {type: String, default: null},
    endDate: {type: String, default: null},
    classType: {type: String, default: "Instrument"},
    booked: [RangeSchema] // array of date ranges
});

const StudioSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    zip: {type:String, required: true},
    pictures: [String],
    coverPicture: {type: String, required: true},
    description: {type: String, required: true},
    rentalPrice: {type: Number, required: true},
    daysRented: {type: Number, default: 1},
    isRental: {type: Boolean, default: true},
    startDate: {type: String, default: null},
    endDate: {type: String, default: null},
    classType: {type: String, default: "Studio"},
    booked: [RangeSchema] // array of date ranges
});

const InstrumentListingSchema = new Schema({
    instrumentId : {type: Schema.Types.ObjectId, ref: "Instrument"},
    sellerId: {type: Schema.Types.ObjectId, ref: "User"},
});

const StudioListingSchema = new Schema({
    studioId: {type: Schema.Types.ObjectId, ref:"Studio"},
    sellerId: {type: Schema.Types.ObjectId, ref:"User"},
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

const OrderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    paymentId: {type: String, required: true},
});


// registering the models
const Range = mongoose.model('Range', RangeSchema);
const User = mongoose.model('User', UserSchema);
const Instrument = mongoose.model('Instrument', InstrumentSchema);
const Studio = mongoose.model('Studio', StudioSchema);
const InstrumentTransaction = mongoose.model('InstrumentTransaction', InstrumentTransactionSchema);
const StudioTransaction = mongoose.model('StudioTransaction', StudioTransactionSchema);
const InstrumentListing = mongoose.model('InstrumentListing', InstrumentListingSchema);
const StudioListing = mongoose.model('StudioListing', StudioListingSchema);
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Range: Range,
    User: User,
    Instrument: Instrument,
    Studio: Studio,
    InstrumentTransaction: InstrumentTransaction,
    StudioTransaction: StudioTransaction,
    InstrumentListing: InstrumentListing,
    StudioListing: StudioListing,
    Order: Order
};

// making connection to the database based on environment
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    console.log("Starting App on Production");
    dbconf = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
} else if (process.env.NODE_ENV === 'DEV') {
    console.log("Starting App on Local Machine");
    dbconf = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
} else if (process.env.NODE_ENV === 'K8S') {
    dbconf = `mongodb+srv://mir:${process.env.DB_PASSWORD}@mogodb-e1iak.gcp.mongodb.net/InstrumentExchange?retryWrites=true`;
    console.log("starting app on Kubernetes cluster with MongoDB Atlas");
} else if (process.env.NODE_ENV === 'ATLAS') {
    console.log("starting app with MongoDB ATLAS");
    dbconf = `mongodb+srv://mir:${process.env.DB_PASSWORD}@mogodb-e1iak.gcp.mongodb.net/InstrumentExchange?retryWrites=true`;
} else {
    dbconf = `mongodb://localhost/InstrumentExchange`;
}

mongoose.connect(dbconf, {useNewUrlParser: true, useCreateIndex: true})
    .then ( ()=> { console.log("MongoDB Connected"); })
    .catch( err => console.log(err));
