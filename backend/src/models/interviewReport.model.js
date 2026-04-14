const mongoose =require("mongoose")

/**
 * -job description schema 
 * -resume text
 * -self description
 * 
 * -techincal -question :[{questioon }]
 * -behavioral question []
 * skill gaps []
 * -prepartion plan:[{}]
 */
const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"]
    },
    intention: {
      type: String,
      required: [true, "Intention is required"]
    },
    answer: {
      type: String,
      required: [true, "Answer is required"]
    }
  },
  {
    _id: false   
  }
);
const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String
        ,required:[true,"skill is required "]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"severity is required "]
    }
},{
        _id:false
    });
const prepartionPlanSchema =new mongoose.Schema({
    day : {
        type :number ,
        required : [true ,"Day is required "]
    },
    focus :{

     type:String,
     required:[true,"Focus is required "],
    },tasks:{

     type:String,
     required:[true,"tasks is required "],
    }
},{
        _id:false
    }
);
const behavioralquestionsSchema=new mongoose.Schema( {
    question: {
      type: String,
      required: [true, "Technical question is required"]
    },
    intention: {
      type: String,
      required: [true, "Intention is required"]
    },
    answer: {
      type: String,
      required: [true, "Answer is required"]
    }
  },
  {
    _id: false   
  }
);
const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true ,"job description is required"]

    },
    resume:{
        type:String

    }
    ,
    selfDescription:{
        type:String 
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    }
    ,
    technicalQuestions:[technicalQuestionsSchema],
    behavioralquestions:[behavioralquestionsSchema]
    ,skillGaps:[skillGapSchema],
    prepartionPlan:[prepartionPlanSchema]
},{
    timestamps:true
})

const interviewReportmodel=mongoose.model("InterviewReport",interviewReportSchema);
module.exports=interviewReportmodel