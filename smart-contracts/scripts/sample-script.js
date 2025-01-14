// scripts/deploy.js
async function main() {
    // On récupère le contrat d’exemple “Greeter”
    const Greeter = await ethers.getContractFactory("Greeter");
    // On le déploie avec un message initial
    const greeter = await Greeter.deploy("Hello, Hardhat!");

    await greeter.deployed();
    console.log("Greeter deployed to:", greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
