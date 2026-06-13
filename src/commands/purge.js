const discord = require('discord.js');
const log = require('../core/log');

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specific amount of messages in a channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
        .addIntegerOption((option) => {
            return option
                .setName('amount')
                .setDescription('Amount of messages to delete (1-100)')
                .setRequired(true);
        }),
    async execute(client, interaction) {
        const amount = interaction.options.getInteger('amount');

        let success = true;
        let messages = null;

        try {
            messages = await interaction.channel.bulkDelete(amount, true);
        } catch (error) {
            success = false;
            log(error, 2);
        }

        let outputToReturn = null;

        if (success && messages) {
            let breakdown = '';
            const userCounts = {};

            messages.forEach(msg => {
                const username = msg.author.username;
                userCounts[username] = (userCounts[username] || 0) + 1;
            });

            for (const [username, count] of Object.entries(userCounts)) {
                breakdown += `\n${count} message${count > 1 ? 's' : ''} by ${username}`;
            }

            outputToReturn = `Deleted ${messages.size} messages.\n${breakdown}`;
        } else {
            outputToReturn = 'Failed to delete messages.';
        }

        await interaction.reply({ content: outputToReturn });
    }
}