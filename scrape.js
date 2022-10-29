const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

const url = 
    "https://www.amazon.ca/dp/B09KZYYTSJ/?coliid=I2Z75J54VLTSFD&colid=24G32GYASLKIP&psc=1&ref_=lv_ov_lig_dp_it";
const product ={ name: "", price: "", link: "" };

const handle = setInterval(scrape, 20000);

async function scrape(){
    const {data} = await axios.get(url);

    const $ = cheerio.load(data);
    const item = $("div#dp-container");

    product.name = $(item).find("h1 span#productTitle").text();
    product.link = url;
    const price = $(item)
        .find("span .a-price-whole")
        .first()
        .text()
        .replace(/[,.]/g, "");
    
    const priceNum = parseInt(price);

    //Send an SMS
    if(priceNum < 50){
        client.messages.create({
            body: `The price of ${product.name} went below ${price}. Purchase it at ${product.link}`,
            from: "+12058276406",
            to: '+14313343698'
        }).then(()=> clearInterval(handle));
    }
}

scrape();