
/* Function to calculate the solutions to the quadratic formula
/* @param a -> a term
/* @param b -> b term
/* @param c -> c term
/*
/* @return -> Tuple with two solutions (Access via res.x1 and res.x2)
*/

const blacklistedWords = ["Fuck", "fuck", "fuuck", "fuuckk", "fucck", "Fucck", "Fucckk", "fuckk", "fuk", "FUK", "Fukk", "Fukkk", "fukkk", "Fulck", "fukk", "Fuk", "fuckkk", "FUCK", "FUUCK", "FUCKK", "FUUCKK", "Fuckk", "Fuuck", "Fuckkk", "bitch", "bitchh", "biitch", "Bitch", "BITCH"];

function quadratic_calculator(a, b, c){

    if(a === undefined || b === undefined || c == undefined)
        return undefined;    

    let answers = {x1:0, x2:0};

    answers.x1 = (-b + (Math.sqrt(Math.pow(b,2) - 4 * a * c))) / (2*a);
    answers.x2 = (-b - (Math.sqrt(Math.pow(b,2) - 4 * a * c))) / (2*a);

    if(isNaN(answers.x1) || isNaN(answers.x2))
        return undefined;

    return answers;
}


function findPermutations (string) {

 if (string.length < 2) return string; // This is our break condition

  var permutations = []; // This array will hold our permutations
  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue; // skip it this time

    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

    for (var subPermutation of findPermutations(remainingString))
      permutations.push(char + subPermutation)
  }
  return permutations;
}

// Discord Boilerplate

const {Client, MessageEmbed} = require('discord.js');

const client = new Client();

const config = require('./config.json');


const PREFIX1 = '!';
const PREFIX2 = '='

client.on('ready', () => {
    console.log('Ullu is online!'); 
})

// Command Handler

client.on('message', message => {

    let args = message.content.substring(PREFIX1.length).split(" ");
    let msg2 = message.content.split(" ");

    /*
        
    for(let a = 0; a < msg2.length; a++){

        if(message.content[0] === '!'){
            break;
        }

        else{

        let permutationsArray = findPermutations(msg2[a]);

        if(permutationsArray === undefined)
            break;

        for(let i = 0; i < permutationsArray.length; i++){

            if(permutationsArray === undefined)
                break;

            if(permutationsArray[i] === "ullu" || permutationsArray[i] === "Ullu" || permutationsArray[i] === "ULLU"){
                for(let j = 0; j < 5; j++){
                    console.log("the bug is happening here?");
                    message.channel.send("Sukhraj is an ullu!");
                }
            }

            for(let j = 0; j < blacklistedWords.length; ++j){
                if(permutationsArray[i] === blacklistedWords[j])
                    message.channel.send("No swearing bud.");
            }
        }
      }
    }
    */

 
    if(args[0] == 'ullu') { 
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

    else if(args[0] == 'ping') { 

            console.log("Creating embed and assigning user to be pinged.");
            let user = message.mentions.users.first();
            let iterations = isNaN(args[2]) ? undefined : parseInt(args[2]);

            const Embed = new MessageEmbed()
            .setTitle("Wake up!")
            .setColor(0xFF0000)
            .setDescription("WAKE UP");

            user.send(Embed)
            
            console.log("Sent pinged user the embed");

            if(iterations === undefined){
                for(let z = 0; z < 20; z++){
                    console.log("Pinging user...");
                    user.send("Check Discord messages buddy");
                }
            }

            else{
                for(let z = 0; z < iterations; z++){
                    console.log("Pinging user...");
                    user.send("Check Discord messages buddy");
                }
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

});

client.login(config.token);