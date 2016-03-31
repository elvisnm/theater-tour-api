import mongoose from '../services/mongo';
import {types as showCategoriesTypes} from './show-category';
import Theater from './theater';

const schemaTypes = mongoose.Schema.Types;

const sessionsSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {_id: false});

const theatersSchema = new mongoose.Schema({
    id: {type: schemaTypes.ObjectId, ref: 'Theater'},
    sessions: [sessionsSchema]
}, {_id: false});

const showSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, unique: true, mergeable: false},
    description: {type: String},
    cast_actors: {type: String, required: true},
    duration: {type: String},
    photo: {type: String},
    website: {type: String},
    age_group: {type: String, required: true},
    theaters: [theatersSchema],
    url: {type: String, mergeable: false},
    category: {
        type: String,
        mergeable: false,
        enum: [showCategoriesTypes.COMEDY, showCategoriesTypes.DRAMA]
    },
    published: {type: Boolean, default: false},
    publishedAt: {type: Date, default: null},
    createdAt: {type: Date, mergeable: false},
    updatedAt: {type: Date, mergeable: false},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
        transform(doc, ret /* , game */) {
            delete ret._id;
            delete ret.__v;
        }
    },
    toObject: {
        virtuals: true,
        getters: true,
        transform(doc, ret/* , game */) {
            delete ret._id;
            delete ret.__v;
        }
    }
});

export default mongoose.model('Show', showSchema);
