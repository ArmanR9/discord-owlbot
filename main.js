
/* Function to calculate the solutions to the quadratic formula
/* @param a -> a term
/* @param b -> b term
/* @param c -> c term
/*
/* @return -> Tuple with two solutions (Access via res.x1 and res.x2)
*/

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
    
 
    if(args[0] == 'ullu') { 
            const Embed = new MessageEmbed()
            .setTitle("Next Level Code")
            .setColor(0xFF0000)
            .setDescription("What up ULLU");
            message.author.send(Embed);
            for(let i = 0; i < 20; i++){
                message.author.send("Sukhraj is an ullu");
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