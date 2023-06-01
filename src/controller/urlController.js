const urlModel = require('../model/urlModel')
const shortId = require('shortid')

const isValid = (a) => {
    if (typeof a === "undefined" || typeof a === "null") return false;
    if (typeof a === "string" && a.trim().length === 0) return false;
    return true;
};

let createUrl = async(req, res) => {

    try {
        let data = req.body


        // validation for request body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Invalid Url please provide valid details" })
        }

        // validation for longUrl
        const { longUrl } = data;

        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: "Please give the long URL" })
        }

        if (!validUrl.isWebUrl(longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please enter a valid long url" })
        }

        let url = await urlModel.findOne({ longUrl: data.longUrl })
        if (url) {
            return res.status(400).send({ status: false, message: "url is alredy present in db" })
        }

    }catch (err) {
        res.status(500).send({ status: false, message: err.message })

    }
}