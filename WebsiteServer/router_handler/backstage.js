const db = require('../db/index');
const bcrypt = require("bcryptjs");
const userLogin = (req, res) => {
    const { username, password } = req.body;
    db.query("select password from admin where username=?", [username], (err, results) => {
        if (err) return res.status(500).json({ msg: "查询错误", err });
        const compareResult = bcrypt.compareSync(password, results[0].password);
        if (compareResult) res.status(200).json({ msg: "登陆成功" });
        else res.status(500).json({ msg: "登陆失败" });
    });
}

const getSetupMessage = (_req, res) => {
    db.query("select payData,wechatNum from pcpay where id=?", ["OBSStudio"], (err, results) => {
        if (err) return res.status(500).json({ msg: "查询错误", err });
        return res.status(200).json({ msg: "查询成功", results });
    })
};


const changeSetupMessageNum = (req, res) => {
    const { str } = req.body;
    db.query("update pcpay set payData=? where id=?", [str, "OBSStudio"], (err, results) => {
        if (err) return res.status(500).json({ msg: "金额更新错误", err });
        if (results.affectedRows !== 1) return res.status(500).json({ msg: "金额更新错误", err });
        return res.status(200).json({ msg: "金额修改成功" });
    })
}

const changeWechatNum = (req, res) => {
    const { wechatNum } = req.body;
    db.query("update pcpay set wechatNum=? where id=?", [wechatNum, "OBSStudio"], (err, results) => {
        if (err) return res.status(500).json({ msg: "金额更新错误", err });
        if (results.affectedRows !== 1) return res.status(500).json({ msg: "金额更新错误", err });
        db.query("select wechatNum from pcpay where id=?", ["OBSStudio"], (err, results) => {
            if (err) return res.status(500).json({ msg: "查询错误", err });
            return res.status(200).json({ msg: "修改成功", results });
        })
    })
}

module.exports = {
    userLogin,
    getSetupMessage,
    changeSetupMessageNum,
    changeWechatNum
}