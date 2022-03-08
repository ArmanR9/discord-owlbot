
/* Function to calculate the solutions to the quadratic formula
/* @param a -> a term
/* @param b -> b term
/* @param c -> c term
/*
/* @return -> Tuple with two solutions (Access via res.x1 and res.x2)
/* ... If discriminate value computes to a negative value, -1 will be returned
/* ... If discriminate value is 0, a tuple will have one solution (x1) and the other will be undefined
*/

function quadratic_calculator(a, b, c){

    if(isNaN(a) || isNaN(b) || isNaN(c) || (a == 0)){ // a == 0 means divide by zero error
        console.log("Input passed into quadratic calculator is undefined");
        return undefined;    
    }
    
    const discriminate = Math.pow(b,2) + (-4 * a * c); // Calculating discriminate beforehand to determine number of solutions
    let solutions = {x1: 0, x2: 0};

    if(discriminate < 0){
        console.log("Discriminate value inputted is negative!");
        return -1;
    }
    
    else if(discriminate === 0){
        console.log("Discriminate is 0, only 1 solution.");

        solutions.x1 = (-b + (Math.sqrt(discriminate))) / (2*a);
        solutions.x2 = undefined;

        return solutions;
    }

    else{
        console.log("Discriminate is positive, 2 solutions.");

        solutions.x1 = (-b + (Math.sqrt(discriminate))) / (2*a);
        solutions.x2 = (-b - (Math.sqrt(discriminate))) / (2*a);

        return solutions;
    }
}

// Blacklisted word variations that should be flagged by the bot

const blacklistedWords = ["placeholder", "PlAcEholder", "PLACEHOLDER"];

/*
    Code courtesy of user Syntac from
    https://stackoverflow.com/questions/39927452/recursively-print-all-permutations-of-a-string-javascript
*/
 
function findPermutations (string) {

 if (string.length < 2) return string; // This is our break condition

  var permutations = []; // This array will hold our permutations
  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue; // skip it this time

    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);

    for (var subPermutation of findPermutations(remainingString))
      permutations.push(char + subPermutation)
  }
  return permutations;
}

// Discord Boilerplate

require('dotenv').config(); // Import API Key for plotly from .env file

const {Client, MessageEmbed, MessageAttachment} = require('discord.js');

// const Discord = require('discord.js');

const client = new Client();

const config = require('./config.json');

const fs = require('fs');

var plotly = require('plotly')("ArmanR9", process.env.PLOTLY_API_KEY);


const PREFIX1 = '!'; // For ullubot (our bot code)
const PREFIX2 = '='; // Reserved prefix for Math Bot

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

client.on('ready', () => {
    console.log('Ullu is online!'); 
})

// Command Handler

client.on('message', message => {

    let args = message.content.substring(PREFIX1.length).split(" ");
    let msg2 = message.content.split(" ");

    
    if(msg2[0] != '!'){

        for(let a = 0; a < msg2.length; a++){

            if(message.content[0] == '!'){
                break;
            }

            else{

                let permutationsArray = findPermutations(msg2[a]);

                if(permutationsArray === undefined)
                    break;

                for(let i = 0; i < permutationsArray.length; i++){

                    if(permutationsArray === undefined)
                        break;

                    if(permutationsArray[i] === "ullu" || permutationsArray[i] === "Ullu" || permutationsArray[i] === "ULLU" || permutationsArray[i] == "ulluu"){
                        message.channel.send("Sukhraj is an ullu!");
                    }
                

                    for(let j = 0; j < blacklistedWords.length; j++){
                        if(permutationsArray[i] === blacklistedWords[j])
                            message.channel.send("No swearing bud.");
                    }
                }
            }
        }
    }

    /* Ullu keyword for command is bugged. Do not use */
    
         if(args[0] == 'sukhraj') { 
            console.log("Creating embed\n");

            const Embed = new MessageEmbed()
            .setTitle("Next Level Code")
            .setColor(0xFF0000)
            .setDescription("What up ULLU");

            message.author.send(Embed);

            console.log("Embed sent to author\n");

            for(let z = 0; z < 20; z++){
                console.log("Sending author message\n");
                message.author.send("Sukhraj is an ullu");
            }
        }

        else if(args[0] == 'ping'){

            let stringToWrite = ''; 

            console.log("Creating embed and assigning user to be pinged.");

            const user = message.mentions.users.first();

            let iterations = isNaN(args[2]) ? undefined : parseInt(args[2]);

             const Embed1 = new MessageEmbed()
                .setTitle("The Pinginator!")
                .setColor(0xFF0000)
                .setDescription("Have fun annoying people");

            if(user === undefined){
                console.log("User mentioned is invalid");
            }

            else if(Math.sign(iterations) == -1){
               
                message.channel.send(Embed1);
                message.channel.send("Invalid argument given.");
            }

            else{

                iterations = iterations > 100 ? 100 : iterations; // Cap number of pings to 100 

                const Embed = new MessageEmbed()
                .setTitle("Wake up!")
                .setColor(0xFF0000)
                .setDescription("WAKE UP");

                user.send(Embed)
            
                console.log("Sent pinged user the embed");

                if(iterations === undefined){
                    for(let z = 0; z < 20; z++){
                        console.log("Pinging user...");
                        stringToWrite += "Pinging "+ user.username + " # " + (z+1).toString() + "\n";
                        user.send("Check Discord messages buddy");
                    }
                }

                else{
                    for(let z = 0; z < iterations; z++){
                        console.log("Pinging user...");
                        stringToWrite += "Pinging "+ user.username + " # " + (z+1).toString() + "\n";
                        user.send("Check Discord messages buddy");
                    }
                }

                stringToWrite += "User has been successfully pinged\n"
                fs.writeFileSync('/tmp/logs.txt', stringToWrite);
                const buffer = fs.readFileSync('/tmp/logs.txt');

                const attachment = new MessageAttachment(buffer, 'logs.txt');

                message.channel.send(attachment);
                message.channel.send(Embed1);
                message.channel.send("The recipient has been successfully annoyed.")
            }
    }

    else if(args[0] == 'quad'){
     
        const res = quadratic_calculator(args[1],args[2],args[3]);

        if(res === undefined){
            console.log("ERROR: Undefined values\n Make sure to input all parameters: a b c");

            const Embed = new MessageEmbed()
            .setTitle("Quadratic calculator! Powered by ullubot.")
            .setColor(0xFF0000)
            .setDescription("Calculator to find the solutions of the quadratic formula\n (ax^2 + bx + c = 0).\n\n To use the command, simply type: !quad a b c \n\n Your results were undefined, make sure you input the paramters correctly!");

            message.channel.send(Embed);
            message.channel.send("ERROR: Undefined values");
        }
        else if(res === -1){
            const Embed = new MessageEmbed()
            .setTitle("Quadratic calculator! Powered by ullubot.")
            .setColor(0xFF0000)
            .setDescription("Calculator to find the solutions of the quadratic formula\n (ax^2 + bx + c = 0).\n\n To use the command, simply type: !quad a b c \n\n The discriminate calculated is negative, there are no solutions.");
            message.channel.send(Embed);

            message.channel.send("No solutions.");
        }

        else{
            if(res.x2 === undefined){
                console.log(res.x1 + " ");

                const Embed = new MessageEmbed()
                .setTitle("Quadratic calculator! Powered by ullubot.")
                .setColor(0x00FF00)
                .setDescription("Calculator to find the solutions of the quadratic formula\n (ax^2 + bx + c = 0).\n\n To use the command, simply type: !quad a b c \n\n The discriminate calculated is 0, there is only one solution.");

                message.channel.send(Embed);
                message.channel.send("Solution: " + res.x1);
 
            }
            else{
                console.log(res.x1 + " " + res.x2);

                const Embed = new MessageEmbed()
                .setTitle("Quadratic calculator! Powered by ullubot.")
                .setColor(0x00FF00)
                .setDescription("Calculator to find the solutions of the quadratic formula\n (ax^2 + bx + c = 0).\n\n To use the command, simply type: !quad a b c");

                message.channel.send(Embed);
                message.channel.send("Solution 1: " + res.x1 + '\n' + "Solution 2: " + res.x2);
            }
        }
    }

    else if(args[0] == 'graph'){

        let inputMathEq = args; // Get the polynomial string
        inputMathEq.shift(); // Remove the 'graph' element, from the array


        for(let i = -127; i < 128; i++){ //127 data points
            arrX.push(i);
            arrY.push(Math.pow(i,2));
        }

        var trace1 = {
            x: arrX,
            y: arrY,
            type: 'lines'
        };

       /* var trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
        type: 'scatter'
       */ //};

        var data = [trace1];

        var layout = {fileopt : "overwrite", filename : "current-file"};

        plotly.plot(data, layout, function (err, msg) {
            if (err) return console.log(err);
            console.log(msg);

            const Embed = new MessageEmbed()
                .setTitle("Graphing calculator! Powered by plotly.")
                .setColor(0xFFFFF0)
                .setDescription("Testing graphing stuff\n\n Currently testing quadratic equation\n\n" + msg.url);
            message.channel.send(Embed);
        });

          let equation = "y = x^2";
          let mathbot_cmd = "=tex y = x^2";

          message.channel.send("Equation: " + equation + " \n\nPaste this in chat: " + mathbot_cmd);
          //message.channel.send(Embed);
    }

});

client.login(config.token);
