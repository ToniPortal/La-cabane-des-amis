exports.run = async (client, interaction) => {
  try {
    var des = "";

    const response = await fetch("https://api.hbc-group.fr/get/usertime/");
    if (!response.ok) {
      throw new Error("Erreur lors de la requête : " + response.status);
    }
    const data = await response.json();
    console.log("Réponse de l'API :", data);

    data.forEach((user, index) => {
      const [hoursStr, minutesStr, secondsStr] = user.time.split(':');
  
      // Convertit les parties de la chaîne en nombres entiers
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      const seconds = parseInt(secondsStr, 10);
    
      des += `${index + 1}) ${
        user.name
      } : ${hours} Heures ${minutes} Minutes ${seconds} secondes\n`;
    });

    const embeds = {
      color: 0x9203fe,
      title: "Leaderboard - Temps de jeux",
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL(),
      },
      description: des,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: `©mc`,
      },
    };

    interaction.reply({
      embeds: [embeds],
    });
  } catch (error) {
    console.error("Erreur :", error.message);
  }
};
