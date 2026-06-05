const discord = require('discord.js');

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName('countdown')
    .setDescription('Start a countdown')
    .setDMPermission(true)
    .setContexts(
      discord.InteractionContextType.PrivateChannel,
      discord.InteractionContextType.BotDM,
      discord.InteractionContextType.Guild,
    )
    .addIntegerOption((option) => {
      return option
        .setName('countdown')
        .setMinValue(1)
        .setMaxValue(300)
        .setDescription('Countdown in seconds.');
    }),
  async execute(client, interaction) {
    const countdown = interaction.options.getInteger('countdown') ?? 30;
    const channel = interaction.channel;

    await interaction.reply(`Countdown: ${countdown}`);

    for (let i = countdown; i >= 0; i--) {
      interaction.editReply(`Countdown: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await interaction.followUp(`<@${interaction.user.id}> Countdown finished!`);
  },
};
