const discord = require('discord.js');

const quotes = [
  {
    quote: 'I have no special talent. I am only passionately curious.',
    author: 'Albert Einstein',
  },
  {
    quote: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Maya Angelou',
  },
  {
    quote:
      'I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.',
    author: 'Bill Gates',
  },
  {
    quote: 'It always seems impossible until it is done.',
    author: 'Nelson Mandela',
  },
  {
    quote:
      'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    quote: 'The mind is everything. What you think you become.',
    author: 'Buddha',
  },
  {
    quote:
      'We safely learn to control our environment when we first learn to control ourselves.',
    author: 'Hypatia',
  },
  {
    quote: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
  },
  {
    quote: 'Placeholder text.',
    author: 'CoreDumpNotCrash',
  },
  {
    quote: 'Core was here.',
    author: 'CoreDumpNotCrash',
  },
];

function returnMessageToOutput(quote) {
  return quote ? `"${quote.quote}" - ${quote.author}` : 'Quote not found';
}

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName('random-quote')
    .setDescription('Says a random quote')
    .setDMPermission(true)
    .addStringOption((option) => {
      return option
        .setName('author')
        .setDescription('The author of the quote to filter by')
        .setRequired(false);
    }),

  async execute(client, interaction) {
    const hasAuthor = interaction.options.getString('author') ? true : false;

    if (hasAuthor) {
      const author = interaction.options.getString('author');
      const quote = quotes.find(
        (q) => q.author.toLowerCase() === author.toLowerCase()
      );
      await interaction.reply(returnMessageToOutput(quote));
    } else {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      await interaction.reply(returnMessageToOutput(quote));
    }
  },
};
