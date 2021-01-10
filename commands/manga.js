const malScraper = require('mal-scraper');
const Discord = require("discord.js");

module.exports = async (client, message) => {
	var split = message.content.toLowerCase().split(" ");
	split.shift();
	
	const search_term = split.join(" ");
	const search = malScraper.search;

	if (!search_term) return message.reply("Please provide a search term!");
 
	var results = await search.search("manga", {
	  maxResults: 1,
	  term: search_term,
	}).catch(e => {
		return message.reply("We could not find your query.");
	});

	var anime = results[0];
	console.log(anime)

	var embed = new Discord.MessageEmbed();
	embed.setTitle(anime.title);
	embed.setDescription(anime.shortDescription);
	embed.setThumbnail(anime.thumbnail);
	embed.setURL(anime.url);
	embed.setColor("#FF69B4");

	embed.addFields(
		{ name: "Score", value: `${anime.score}/10`, inline: true },
		{ name: "Start Date", value: anime.startDate, inline: true },
		{ name: "Stop Date", value: anime.endDate, inline: true },
		{ name: "Volume Count", value: anime.vols, inline: true },
		{ name: "Chapter Count", value: anime.nbChapters, inline: true },
		{ name: "Type", value: anime.type, inline: true }
	);
	message.channel.send(embed);
};