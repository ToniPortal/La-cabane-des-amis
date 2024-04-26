const {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    REST,
    Routes,
    Intents,
  } = require("discord.js"),
  client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  }),
  config = require("./config.json"),
  rest = new REST({ version: "10" }).setToken(config.token);

async function login() {
  await client.login(config.token);
  return console.log(">Connexion...\n--------------");
}

client.commands = new Collection();

const commands = [
  {
    name: "deploy",
    description: "Deployer les commande",
  },
  {
    name: "playtime",
    description: "playtime",
  },
];

client.once(Events.ClientReady, async () => {
  console.log(
    " _   _   _____   _       _       _____  \n" +
      "| | | | | ____| | |     | |     /  _   \n" +
      "| |_| | | |__   | |     | |     | | | | \n" +
      "|  _  | |  __|  | |     | |     | | | | \n" +
      "| | | | | |___  | |___  | |___  | |_| | \n" +
      "|_| |_| |_____| |_____| |_____| _____/ \n"
  );

  // Définir les commandes globales au démarrage du bot
  try {
    const commands = [
      {
        name: "deploy",
        description: "Déployer les commandes",
      },
      {
        name: "playtime",
        description: "playtime",
      },
    ];

    // Définir les commandes globales au démarrage du bot
    console.log("Started refreshing application (/) commands.");
    await client.application.commands.set(commands);
    console.log("Successfully set application (/) commands.");
  } catch (err) {
    console.error("Error refreshing application (/) commands:", err);
  }
});

const commandes = [
    {
      name: "deploy",
      description: "Déployer les commandes",
    },
    {
      name: "playtime",
      description: "playtime",
    },
  ];

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.commandName;
  if (!command) return;

  if (interaction.commandName === "deploy") {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(config.cliend_id), {
        body: commandes,
      });

      console.log("Successfully reloaded application (/) commands.");
      interaction.reply({
        content: "Successfully reloaded application (/) commands.",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await require(`./commands/${interaction.commandName}.js`).run(
        client,
        interaction
      );
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content:
            "Une erreur s'est produite lors de l'exécution de cette commande",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content:
            "Une erreur s'est produite lors de l'exécution de cette commande",
          ephemeral: true,
        });
      }
    }
  }
});

// Pour afficher les erreur ou les warning
client.on("error", (e) => {
  console.log(`Erreur critique :\n ${e}`);
});

login();
