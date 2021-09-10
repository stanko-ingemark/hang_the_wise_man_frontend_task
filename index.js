const axios = require('axios');
const { uniq, random, range } = require('lodash');

const QUOTES_URL = 'https://api.quotable.io/quotes';
const TEST_SENTANCE = 'Wisdom, compassion, and courage are the three universally recognized moral qualities of men.';

const countUniqueChars = (sentance) => {
	const cleanedUp = sentance.replace(/\W/gi, '').toLowerCase();
	const characters = cleanedUp.split('');
	return uniq(characters).length;
}

const NAMES = ["Ayushman", "Dorion", "Dailynn",  "Josephine", "Gurjot", "Zarae", "Idalie", "Galena", "Quashawn", "Renzo", "Naiel", "Huy", "Yayra", "Zaha", "Bowen"];
const randomUser =  () => NAMES[random(NAMES.length -1)];


axios.get(QUOTES_URL).then(result => {
	const quotes = result.data.results;
	const quoteData = quotes.map(quote => {
	const numUniqueChars = countUniqueChars(quote.content);
	return {
		quoteId: quote._id,
		length: quote.length,
		uniqueCharacters: numUniqueChars,
		userName: randomUser(),
		errors: random(0, Math.max(numUniqueChars-2,0)),
		duration: range(0, quote.length).reduce((sum, el) => sum+random(500,2000))
		}
	})
	console.log(JSON.stringify({highscores: quoteData}, null, 2));
});




