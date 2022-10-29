const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const url = [];
const product ={

    name: "",
    price: "",
    link: "" 

};

async function scrape(){
    const {data} = await axios.get();

    const $ = cheerio.load(data);
    const item = $("");

    product.name = $(item).find("h1 span#productTitle").text();
    product.link = url;
    const price = $(item)
        .find("span .a-price-whole")
        .first()
        .text()
        .replace(/[,.]/g, "");
    
    const priceNum = parseInt(price);

}

scrape();