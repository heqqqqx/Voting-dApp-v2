// scripts/deployVoting.js
const { ethers } = require("hardhat");

async function main() {
    // On récupère la factory du contrat "Voting"
    const Voting = await ethers.getContractFactory("Voting");

    // On déploie le contrat avec un tableau de noms de propositions
    // (doit matcher le constructor(string[] memory proposalNames))
    const voting = await Voting.deploy([
        "Emmanuel Macron - Renaissance",
        "Marine Le Pen - Rassemblement National",
        "Jean-Luc Mélenchon - La France Insoumise",
        "Vote Blanc"
    ]);

    // On attend la fin du déploiement
    await voting.deployed();

    // On log l’adresse du contrat
    console.log("Voting deployed at:", voting.address);
}

// On gère la fonction main pour capter les erreurs éventuelles
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
