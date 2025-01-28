import mongoose from 'mongoose';

const notesSchema = mongoose.Schema({
    title: {
        type: String,
    },
    userId: {
        type: String,
    }
},{
    timestamps: true
});

const NotesModel = mongoose.model('Notes', notesSchema);
export default NotesModel;