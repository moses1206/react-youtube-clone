const express = require('express');
const router = express.Router();

const { Comment } = require('../models/Comment');

const { auth } = require('../middleware/auth');

router.post('/saveComment', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    // comment의 아이디 뿐만아니라 다른 정보도 함께 가져오기 위해서
    Comment.find({ _id: comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });

        res.status(200).json({ success: true, result });
      });
  });
});

router.post('/getComments', (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
