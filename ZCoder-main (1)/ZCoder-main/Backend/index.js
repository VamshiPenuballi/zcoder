const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User, validate } = require('./models/user.model.js');
const Event = require('./models/events.model.js');
const SCode = require('./models/saveCode.model.js');
const Msg = require('./models/msg.model.js');
const Cmmt = require('./models/comment.model.js');
const http = require("http");
const Token = require("./models/token");
const path = require("path");
const userRoutes = require("./models/users");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const bcrypt = require("bcrypt");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log("id", socket.id);
    socket.on('user-message', (message)=>{
        io.emit('message', message);
    });
    socket.on('user-name', (name)=>{
        io.emit('name', name);
    })
});


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve("../ChatRoom/chatRoom.jsx")));
app.use("/api/users", userRoutes);

server.listen(1500, () => {
    console.log("listening to port 1000 server");
});

app.listen(1000, () => {
    console.log("Listening to port 1000");
});

app.get('/', (req, res) => {
    res.send("Hello from ZCoder Backend");
});

app.post("/register", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ name, email, password, age, github, score, problems_saved, problems_solved, img } = req.body;
    const image = img;

    if(!name || !email ||!password ||!age ||!score ||!problems_saved ||!problems_solved || !github){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            console.log("connction closed POST");
            mongoose.connection.close();
            return res.status(422).json({error: "Email already exist"});
        }else{
            const user = new User({name, email, password, age, github, score, problems_saved, problems_solved, image});
            await user.save();
            console.log("here 2");
            res.status(201).json({message: "user registered successfully"});
            console.log("connction closed POST");
            mongoose.connection.close();
        }
    } catch (e){
        console.log("connction closed POST");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/cal", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:dLrPcW58ErrFGotS@calender.u85ajif.mongodb.net/?retryWrites=true&w=majority&appName=Calender", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ email, date, Title, Description} = req.body;
    console.log(email, date, Title, Description,"^^^^^^^^^^^");

    if(!email ||!date ||!Title ||!Description){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here in cal");

    try{
            const event = new Event({ email, date, Title, Description });
            await event.save();
            console.log("here 2");
            console.log("connction closed GETCAL");
            mongoose.connection.close();
            res.status(201).json({message: "event registered successfully"});
    } catch (e){
        console.log("connction closed GETCAL");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************
//############################################################################################################################################################################################################################################################
app.post("/cal/searchone", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:dLrPcW58ErrFGotS@calender.u85ajif.mongodb.net/?retryWrites=true&w=majority&appName=Calender", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2*1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ date, email } = req.body;
    console.log(date, email);

    if(!date){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
        const eventExist = await Event.findOne({date: date, email: email});
        console.log(eventExist);
        res.json(eventExist);    
        console.log("connction closed SEARCH");
        mongoose.connection.close();
    } catch (e){
        console.log("connction closed SEARCH");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/saveCode", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db SAVECODE SAVECODE SAVECODE SAVECODE");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ name, email, question, solution, tag } = req.body;
    console.log(name, email, question, solution, tag, "^^^^^^^^^^^");

    if(!name || !email ||!question ||!solution ||!tag){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here in saveCode");

    const codeExist = await SCode.findOne({
        "$and":[
            {question: question},
            {email: email}
        ]
    });

    if(codeExist){
        console.log("connction closed POST");
        mongoose.connection.close();
        return res.status(422).json({error: "This question already exist"});
    }

    try{
            const sCode = new SCode({ name, email, question, solution, tag});
            await sCode.save();
            console.log("connction closed postSC");
            mongoose.connection.close();
            res.status(201).json({message: "event registered successfully"});
    } catch (e){
        console.log("connction closed postSC");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************
app.post("/cal/delete", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:dLrPcW58ErrFGotS@calender.u85ajif.mongodb.net/?retryWrites=true&w=majority&appName=Calender", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ eventid } = req.body;

    try{
        Event.deleteOne({_id: eventid},function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.status(201).json({message: "event deleted"});
            console.log("connction closed POST");
            mongoose.connection.close();
        });

        // if(userExist){
        //     console.log("connction closed POST");
        //     mongoose.connection.close();
        //     return res.status(422).json({error: "Email already exist"});
        // }else{
        //     const user = new User({name, email, password, age, github, score, problems_saved, problems_solved});
        //     await user.save();
        //     console.log("here 2");
        //     res.status(201).json({message: "user registered successfully"});
        //     console.log("connction closed POST");
        //     mongoose.connection.close();
        // }
    } catch (e){
        console.log("connction closed POST");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/savedCode/delete", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ codeid } = req.body;

    try{
        SCode.deleteOne({_id: codeid},function (err, obj) {
            if (err){
                console.log("connction closed POST");
                mongoose.connection.close();
                throw err;
            } 
            console.log("1 document deleted");
            res.status(201).json({message: "event deleted"});
            console.log("connction closed POST");
            mongoose.connection.close();
        });

        // if(userExist){
        //     console.log("connction closed POST");
        //     mongoose.connection.close();
        //     return res.status(422).json({error: "Email already exist"});
        // }else{
        //     const user = new User({name, email, password, age, github, score, problems_saved, problems_solved});
        //     await user.save();
        //     console.log("here 2");
        //     res.status(201).json({message: "user registered successfully"});
        //     console.log("connction closed POST");
        //     mongoose.connection.close();
        // }
    } catch (e){
        console.log("connction closed POST");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/sendChat", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ name, chat, email } = req.body;

    if(!name || !chat || !email){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
        const msg = new Msg({name, chat, email});
        await msg.save();
        console.log("here 2");
        res.status(201).json({message: "chat registered successfully"});
        console.log("connction closed POST");
        mongoose.connection.close();
    } catch (e){
        console.log("connction closed POST");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/addComment", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ question, cmt } = req.body;

    if(!question || !cmt){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
        const cmmt = new Cmmt({question, cmt});
        await cmmt.save();
        console.log("here 2");
        res.status(201).json({message: "comment sent successfully"});
        console.log("connction closed POST");
        mongoose.connection.close();
    } catch (e){
        console.log("connction closed POST");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/updateCode", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db SAVECODE SAVECODE SAVECODE SAVECODE");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const{ id, question, solution, tag } = req.body;
    console.log(id , question, solution, tag, "^^^^^^^^^^^");

    if(!id ||!question ||!solution ||!tag){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here in saveCode");

    try{
            await SCode.updateOne({_id:id},{
                $set :{
                    question: question,
                    solution: solution,
                    tag: tag
                }
             });
            console.log("connction closed postSC");
            mongoose.connection.close();
            res.status(201).json({message: "code updated successfully"});
    } catch (e){
        console.log("connction closed postSC");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
app.post("/psaved", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db SAVECODE SAVECODE SAVECODE SAVECODE");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const { email, problems_saved } = req.body;

    try{
            await User.updateOne({email: email},{
                $set :{
                    problems_saved: problems_saved
                }
             });
            console.log("connction closed postSC");
            mongoose.connection.close();
            res.status(201).json({message: "psaved updated successfully"});
    } catch (e){
        console.log("connction closed postSC");
        mongoose.connection.close();
        console.log(e);
    }
});
//************************************************************************************************************************************************************************************************************************************************************ */
//############################################################################################################################################################################################################################################################
app.get("/cal/search/:date/:email", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:dLrPcW58ErrFGotS@calender.u85ajif.mongodb.net/?retryWrites=true&w=majority&appName=Calender", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in search");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    console.log(req.params.email);
    const email = req.params.email;
    const date = req.params.date;

    if(!email || !date){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
            const eventExist = await Event.find(
                {
                    "$and":[
                        {"email": req.params.email},
                        {"date": req.params.date}
                    ]
                }
                );
            console.log("&&&&&&&&&&&&&");
            console.log(eventExist);
            if(eventExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return");
                mongoose.connection.close();
                res.send(eventExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/saveSearch/:email", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in search /:email") ;
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    console.log(req.params.email);
    const email = req.params.email;

    if(!email){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
            const codeExist = await SCode.find(
                {
                    "email": req.params.email
                }
                );
            console.log("&&&&&&&&&&&&&");
            console.log(codeExist);
            if(codeExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return");
                mongoose.connection.close();
                res.send(codeExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
//############################################################################################################################################################################################################################################################
app.get("/codeSearch/:email/:Q", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in search Code saved");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    console.log(req.params.email);
    const email = req.params.email;
    const Q = req.params.Q;

    if(!email || !Q){
        return res.status(422).json({error: "Please fill the field property"});
    }

    console.log("here");

    try{
            const codeExist = await SCode.find(
                {
                    "$and":[
                        {"email": req.params.email},
                        {"question": req.params.Q}
                    ]
                }
                );
            console.log("&&&&&&&&&&&&&");
            console.log("in get call",codeExist);
            if(codeExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                res.send(codeExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/chatRoom/search/:email", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in search");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    console.log(req.params.email);
    const email = req.params.email;

    try{
            const userExist = await User.find(
                {"email": req.params.email}
                );
            console.log("&&&&&&&&&&&&&");
            console.log(userExist);
            if(userExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return");
                mongoose.connection.close();
                res.send(userExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/chatSearch", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in search /:email") ;
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })

    try{
            const chatExist = await Msg.find({});
            console.log("&&&&&&&&&&&&&");
            console.log(chatExist);
            if(chatExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return");
                mongoose.connection.close();
                res.send(chatExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/publicQues", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in publicQues");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const tag = "public";
    try{
            const codeExist = await SCode.find(
                {
                    "tag": tag
                }
                );
            if(codeExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                res.send(codeExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/ques/:q", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:Z2HKMfPsMWpUAZv5@savedcodes.lqdjzmr.mongodb.net/?retryWrites=true&w=majority&appName=SavedCodes", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in publicQues");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const question = req.params.q;
    try{
            const codeExist = await SCode.find(
                {
                    "question": question
                }
                );
            if(codeExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                res.send(codeExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
//############################################################################################################################################################################################################################################################
app.get("/quescomment/:q", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in publicQues");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    const question = req.params.q;
    try{
            const cmmtExist = await Cmmt.find(
                {
                    "question": question
                }
                );
            if(cmmtExist){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                res.send(cmmtExist);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/isUser/:email/:password", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in publicQues");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    try{
            const user = await User.find(
                {
                    
                        "email": req.params.email
                    
                }
                );
            if(user){
                // console.log("user.password", user[0].password);
                // console.log("eventExist"+eventExist);
                const validPassword = await bcrypt.compare(req.params.password, user[0].password);
                if (!validPassword)
			    return res.status(401).send({ message: "Invalid Email or Password" });
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                return res.status(200).send({ message: "Welcome", name: user[0].name, email: user[0].email });
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
app.get("/getUser/:email", async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 2 in publicQues");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
    try{
            const isUser = await User.find({"email": req.params.email});
            if(isUser){
                // console.log("eventExist"+eventExist);
                console.log("connction closed return codeSearch");
                mongoose.connection.close();
                res.send(isUser);
            }else{
                
                console.log("connction closed");
                mongoose.connection.close();
                res.send({});
            }
    } catch (e){
        console.log("connction closed return error");
        mongoose.connection.close();
        console.log(e);
    }
});
//############################################################################################################################################################################################################################################################
