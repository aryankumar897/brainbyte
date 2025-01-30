import  mongoose  from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    idindex: {
      type: String,
    },


    

    lectures: [


      
      {


        idindex: {
          type: String,
        },
    
    
        


        title: {
          type: String,
          required: true,
        },
        slug:{
          type: String,
          default: "",

        },
       
        videourl: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
       
      },
    ],
  },
  { timestamps: true }
);

const CurriculumCourseSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },


    about: {
      type: String,
     
    
    },
    description: {
      type: String,
   
    },

    imageUrl: {
      type: String,
   
    },
   

    level: {
      type: String,
   
    },
    videoUrl:{
      type: String,
    },
   price:{
    type:Number,
   },


    sections: [SectionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.CurriculumCourse || mongoose.model("CurriculumCourse", CurriculumCourseSchema);