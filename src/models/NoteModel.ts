import mongoose, { Schema } from 'mongoose';
import INote from '../interfaces/INote';


const noteSchema: Schema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    }
 }, {
        timestamps: true
    },
);

// Pre-save hook to ensure category is in lowercase before saving to avoid string mismatch during search by categoryId
noteSchema.pre('save', function (next) {
    if (typeof this.category === 'string') {
      this.category = this.category.toLowerCase();
    }
    next();
  });
  

const NoteModel = mongoose.model<INote>('Note', noteSchema);

export  { NoteModel };