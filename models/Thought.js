const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength:1,
            maxLength:250,
        },
        createdAt:{
            type: Date,
            default: Date.now,
// use getter method for created at
            
        },
        username:{
            type: String,
            requires: true,

        },
        reactions:{
            type: Schema.Types.ObjectId,
            ref: 'Reactions'

            
        }
    },{
        timestamps: { createdAt: true, updatedAt:false}
    }


)
const Thought = model('thought',thoughtSchema)
module.exports = Thought