const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  // userFrom 이 userTo를 구독하고 있다.
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
