const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");

let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'stop',
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Stop music playback',
            extendedHelp: 'Stop music playback',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run (message, [...paran]) {
        if(this.client.music.get(message.guild.id) == undefined) throw "No music running!";
        if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
        this.client.music.get('pm').leave(message.guild.id);
        this.client.music.delete(message.guild.id);

        let embed = new MessageEmbed()
        .setColor('#dd67ff')
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        ;

        if (this.client.music.get(message.guild.id) == undefined) {
            embed.setTitle(':interrobang: No music playing');
            embed.setColor('#ff0000');

        } else if (this.client.music.get(message.guild.id).paused) {
            clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
            this.client.music.delete(`${message.guild.id}_pause_timer`);

            this.client.music.get(message.guild.id).stop();
            embed.setTitle(':stop_button: Stopped Playback');

        } else {
            this.client.music.get(message.guild.id).stop();
            embed.setTitle(':stop_button: Stopped Playback');
        }

        message.send(embed);
    }
};