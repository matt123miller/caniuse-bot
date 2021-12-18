import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const TOKEN: string = process.env.TOKEN as string;
const CLIENTID: string = process.env.CLIENTID as string;

const commandsList = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest
  .put(Routes.applicationCommands(CLIENTID), { body: commandsList })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);



export const commands = commandsList;
export default rest;