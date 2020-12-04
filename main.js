const {Client, MessageEmbed} = require('discord.js');

const client = new Client();

const config = require('./config.json');


const PREFIX = '!';

client.on('ready', () => {
	console.log('Ullu is online!');	
})

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    
 
    switch (args[0]) { 
        case 'ullu':
            const Embed = new MessageEmbed()
            .setTitle("Next Level Code")
            .setColor(0xFF0000)
            .setDescription("What up ULLU");
            message.author.send(Embed);
 			for(let i = 0; i < 20; i++){
            	message.author.send("Sukhraj is an ullu");
            }
        break;
    }
 
 
});


client.login(config.token);