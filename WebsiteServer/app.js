const express = require('express');
const cors = require('cors')
const { expressjwt: expressJWT } = require('express-jwt');
const config = require('./config');

const alipaySdkRouter = require('./router/alipaySdk');
const backstageRouter = require("./router/backstage");
const bodyParser = require("body-parser");
const app = express();
// 跨域中间件
app.use(cors());
// 解析json格式数据中间件
// app.use(express.json());
app.use(bodyParser.json({ limit: "210000kb" }));
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/alipay/, /^\/check/, /^\/backstage/] }));

// 全局错误中间件
app.use((err, _req, res, next) => {
    if (err.name === "UnauthorizedError") return res.status(500).json({ meg: "token身份验证失败", err });
    res.send(err);
    next();
})

app.use("/alipay", alipaySdkRouter);
app.use("/backstage", backstageRouter);

// 运行于8000端口
app.listen(8000, () => console.log("Server running"));

