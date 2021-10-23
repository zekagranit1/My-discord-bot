const p5 = require('node-p5');

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

let searchUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';

let wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url%7Ctalkid&format=json&titles=';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        let text;
        if (cmd == 'play') {
            args.splice(0, 1)
            text = args.join(' ');

            let url = searchUrl + text;

                    var fs = require('fs');
    
            const https = require('https');
            

            https.get(url, (res) => {
                let body = "";

                res.on("data", (chunk) => {
                    body += chunk;
                });

                res.on("end", () => {
                    try {
                        let json = JSON.parse(body);
                        const myJSON = json[3].join('\n - ');

                        bot.sendMessage({
                            to: channelID,
                            message:"heres what i found related to "+"\""+text+"\""+": "
                            +myJSON                           
                        })
                       
                        
                    } catch (error) {
                        console.error(error.message);
                    };
                });

            }).on("error", (error) => {
                console.error(error.message);
            });
            //--------------------------
            
            


        }




    }

    switch (cmd) {
        // !ping
        case 'ping':
            bot.sendMessage({
                to: channelID,
                message: 'Pong!'
            })
            break;

        case 'hello':
            bot.sendMessage({
                to: channelID,
                message: 'hello, ' + user
            })
            break;
        case 'info':
            bot.sendMessage({
                to: channelID,
                message: bot.username + " " + bot.id
            })

        // Just add any case commands if you want to..
    }
});

// let userInput;

// let counter = 0;

// function setup() {
//   noCanvas();
//   userInput = select('#userinput');
//   userInput.changed(startSearch);
//   console.log(userInput.value());
//   goWiki(userInput.value());

// }

//   function startSearch() {
//     counter = 0;
//     goWiki(userInput.value());
//   }

//   function goWiki(term) {
//     let url = searchUrl + term;
//     console.log(url)
//     loadJSON(url, gotSearch, 'jsonp');

//   }

//   function gotSearch(data) {
//     console.log(data);
//     // let len = data[1].length;
//     // let index = floor(random(len));
//     let title = data[1][0];
//     title = title.replace(/\s+/g, '_');
//     createDiv(title);
//     console.log('Querying: ' + title);
//     let url = contentUrl + title;
//     let url2= wikiUrl + title;
//     console.log(url)
//     loadJSON(url, gotContent, 'jsonp');
//     loadJSON(url2, gotwiki,'jsonp');
//   }
//   function gotwiki(data){
//     let wiki = data.query.pages;
//     console.log(wiki)
//     let pageId = Object.keys(data.query.pages)[0];
//     console.log(wiki[pageId]['fullurl']);

//   }
//   function gotContent(data) {
//     let page = data.parse.text['*'];
//     createDiv(page);


//     // let pageId = Object.keys(data.query.pages)[0];
//     // console.log(pageId);
//     // let content = page[pageId].revisions[0]['*'];
//     // createDiv(content);
// //     let wordRegex = /\b\w{4,}\b/g;
// //     let words = content.match(wordRegex);
// //     let word = random(words);
// //     goWiki(word);
// //     console.log(word);
//   }
// // }