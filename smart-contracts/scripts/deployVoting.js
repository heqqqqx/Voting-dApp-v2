const { ethers } = require("hardhat");

async function main() {
    const Voting = await ethers.getContractFactory("Voting");

    const voting = await Voting.deploy([
        "Emmanuel Macron - Renaissance",
        "Marine Le Pen - Rassemblement National",
        "Jean-Luc Mélenchon - La France Insoumise",
        "Vote Blanc"
    ]);

    await voting.deployed();

    console.log("Voting deployed at:", voting.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
