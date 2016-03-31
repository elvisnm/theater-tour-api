import mongoose from 'mongoose';
import mongooseMergePlugin from 'mongoose-merge-plugin';
import mongoConfig from '../configs/mongo';

mongoose.plugin(mongooseMergePlugin);

const mongoSigleton = mongoose.connect(mongoConfig.uri, mongoConfig.options, err => {
    if (err) {
        throw err;
    }
});

// Initial server connected state
mongoSigleton.connected = false;

// Change server connected state when connected and ready
mongoSigleton.connection.on('open', () => {
    mongoSigleton.connected = true;
});

// Change server connected state whenever connection is lost
mongoSigleton.connection.on('close', () => {
    mongoSigleton.connected = false;
});

// API documentation at http://mongoosejs.com/docs/api.html
export default mongoSigleton;
