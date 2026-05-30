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
        .setDescription('Countdown in seconds. Default: 10');
    }),
  async execute(client, interaction) {
    const countdown = interaction.options.getInteger('countdown') ?? 10;
    const channel = interaction.channel;

    await interaction.reply('Countdown started!');
    let countDownMessage = await channel.send(`Countdown: ${countdown}`);

    for (let i = countdown; i >= 0; i--) {
      await countDownMessage.edit(`Countdown: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await channel.send(`<@${interaction.user.id}> Countdown finished!`);
  },
};
