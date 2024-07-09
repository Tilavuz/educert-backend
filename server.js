const express = require('express')
const cors = require('cors')
const { connectDb } = require('./db/connectDb')
const app = express()
require('dotenv').config()
app.use('/uploads', express.static('uploads'))

app.use(express.json())
app.use(cors())
connectDb()



// auth Router
const authRouter = require('./routers/auth.router')
app.use('/api', authRouter)

// Filial Router
const filialRouter = require('./routers/filial.router')
app.use('/api', filialRouter)

// Room Router
const roomRouter = require('./routers/room.router')
app.use('/api', roomRouter)

// Subject Router
const subjectRouter = require('./routers/subject.router')
app.use("/api", subjectRouter);

// Teacher Router
const teacherRouter = require('./routers/teacher.router')
app.use("/api", teacherRouter);

// Teacher Router
const groupRouter = require('./routers/group.router')
app.use("/api", groupRouter);

// Teacher Router
const userRouter = require('./routers/user.router')
app.use("/api", userRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`${port} server is running`);
})