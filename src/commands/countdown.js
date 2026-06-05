const discord = require('discord.js');

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName('countdown')
    .setDescription('Start a countdown')
    .addIntegerOption((option) => {
      return option
        .setName('countdown')
        .setMinValue(1)
        .setMaxValue(300)
        .setDescription('Countdown in seconds. Default: 30');
    }),
  async execute(client, interaction) {
    const countdown = interaction.options.getInteger('countdown') ?? 30;
    const channel = interaction.channel;

    await interaction.reply(`Countdown: ${countdown}`);

    // await channel.send('Countdown started!');

    for (let i = countdown; i >= 0; i--) {
      interaction.editReply(`Countdown: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await channel.send(`<@${interaction.user.id}> Countdown finished!`);
  },
};
