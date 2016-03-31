import mongoose from '../services/mongo';
import slugify from 'slug';

const theaterSchema = new mongoose.Schema({
    slug: {type: String},
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    website: {type: String},
    createdAt: {type: Date, mergeable: false},
    updatedAt: {type: Date, mergeable: false},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
        transform(doc, ret /* , game */) {
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true,
        getters: true,
        transform(doc, ret /* , game */) {
            delete ret._id;
        }
    }
});

export default mongoose.model('Theater', theaterSchema);
