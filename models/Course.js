const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String
  },
  degree: {
    type: String
  },
  subtitle: {
    type: String
  },
  syllabus: {
    type: String
  },
  estimatied: {
    type: String
  },

  prerequisites: {
    type: String
  },
  wiilLearn: {
    type: String
  },
  featurs: [
    {
      programOffering: String,
      Enrollment: String
    }
  ],
  reviews: [
    {
      name: String,
      rate: Number,
      body: String,
      userPic: String
    }
  ],
  lessons: [
    {
      title: String,
      pic: String,
      video: String,
      description: String,
      file: String,
      practice: String,
      duration: String,
      createAt: String,
      comments: [
        {
          name: String,
          createAt: String,
          body: String,
          userPic: String,
          replay: [
            {
              name: String,
              createAt: String,
              body: String,
              userPic: String
            }
          ]
        }
      ]
    }
  ],
  instructor: mongoose.Schema.Types.ObjectId,
  introVideo: String,
  tags: [
    {
      tagName: String
    }
  ],
  comments: [
    {
      name: String,
      createAt: String,
      body: String,
      userPic: String,
      replay: [
        {
          name: String,
          createAt: String,
          body: String,
          userPic: String
        }
      ]
    }
  ],
  createAt: String,
  poster:String,
  price:String
});

module.exports = mongoose.model("Course", CourseSchema);
