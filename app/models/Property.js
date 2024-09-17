// // // app/models/Property.js
// // import mongoose from 'mongoose';

// // const PropertySchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   imageUrl: String,
// //   mainPrice: String,
// //   discountedPrice: String,
// //   discountPercent: Number,
// // });

// // export default mongoose.models.Property || mongoose.model('Property', PropertySchema);



// import mongoose from 'mongoose';

// const PropertySchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   discountPrice: Number,
//   discountPercent: Number,
//   imageUrl: String,
//   location: String,
// });

// export default mongoose.models.Property || mongoose.model('Property', PropertySchema);





// // app/models/Property.js
// import mongoose from 'mongoose';

// const PropertySchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   discountPrice: Number,
//   discountPercent: Number,
//   imageUrl: String,
//   location: String,
//   bedrooms: Number,
//   bathrooms: Number,
//   images: {
//     kitchen: String,
//     front: String,
//     compound: String,
//     sittingRoom: String,
//     specialPlace: String,
//   },
// });

// export default mongoose.models.Property || mongoose.model('Property', PropertySchema);











// // app/models/Property.js
// import mongoose from 'mongoose';

// const PropertySchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   discountPrice: Number,
//   discountPercent: Number,
//   imageUrl: String,
//   location: String,  // Location field added
//   bedrooms: Number,  // New field for bedrooms
//   bathrooms: Number, // New field for bathrooms
//   images: {          // New object for specific images
//     kitchen: String,
//     front: String,
//     compound: String,
//     sittingRoom: String,
//     specialPlace: String,
//   },
// });

// export default mongoose.models.Property || mongoose.model('Property', PropertySchema);



// import mongoose from 'mongoose';

// const propertySchema = new mongoose.Schema({
//   agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String }, // Assuming you're storing image URLs
//   price: { type: Number, required: true },
//   location: { type: String, required: true },
//   isApproved: { type: Boolean, default: false }, // New field for admin approval
//   createdAt: { type: Date, default: Date.now },
// });

// const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

// export default Property;









import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval
  createdAt: { type: Date, default: Date.now },
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;
