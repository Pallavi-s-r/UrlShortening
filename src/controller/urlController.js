const urlModel = require('../Models/urlModel')
const shortId = require('shortid')
const validUrl = require('valid-url')
// const isValid = (a) => {
//     if (typeof a === "undefined" || typeof a === "null") return false;
//     if (typeof a === "string" && a.trim().length === 0) return false;
//     return true;
// };
// creating short url
let createUrl = async (req, res) => {
    try {
        let data = req.body
        // validation for request body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Invalid Url please provide valid details" })
        }

        const { longUrl } = data;
        // if (!isValid(longUrl)) {
        //     return res.status(400).send({ status: false, message: "Please give the long URL" })
        // }
        // validation for longUrl
        if (!validUrl.isWebUri(longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please enter a valid long url" })
        }
        //checking the duplicacy of the URL
        let urlCheck = await urlModel.findOne({ longUrl: data.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (urlCheck) {
            return res.status(200).send({ status: true, data: urlCheck })
        }
        //adding base url
        const baseUrl = 'http://localhost:3000'
        //generating short url code
        let urlCode = shortId.generate()
        // appending code with base url
        const shortUrl = baseUrl + '/' + urlCode.toLowerCase();
        data.urlCode = urlCode;
        data.shortUrl = shortUrl;
        // creating record
        const urlData = await urlModel.create(data)
        const response = await urlModel.findOne(urlData._id).select({ _id: 0, urlCode: 1, shortUrl: 1, longUrl: 1 })
        //responding to the client with longUrl, shortUrl, urlCode
        return res.send({ status: true, data: response })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
// redirecting to the user to the actul URl
const redirectUrl = async function (req, res) {
    try {
        //getting urlCode
        const url = req.params.urlCode
        if (!shortId.isValid(url)) {
            return res.status(400).send({ status: false, message: "Please Enter a valid Url" })
        }
        //finding the redirected resource URL 
        const redirectedUrl = await urlModel.findOne({ urlCode: url })
        // if resource is not available
        if (!redirectedUrl) {
            return res.status(404).send({ status: false, message: "Resource not found" })
        }
        // if resouce is available
        res.status(302).redirect(redirectedUrl.longUrl)
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// exporting modules to access them in other files
module.exports = { createUrl, redirectUrl }