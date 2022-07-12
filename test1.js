const {ethers} = require("ethers")
const contractabi = require("./contractabi.json")

providerURL = "https://data-seed-prebsc-1-s1.binance.org:8545"
contractAddr = "0x715696b3AEA58920E1F5A4cF161e843405D2d384"

myprivatekey = "0x62960146bd92146fe5550c61c7cc97d4e2d06d761f0aed7aa4295b7f32c5e9ca"
topublickey = "0x3126081ee598F6658eF6b1aA6A067484759DE4cA"
value = 10

provider = new ethers.providers.JsonRpcProvider(providerURL)
wallet = new ethers.Wallet(myprivatekey)
wallet = wallet.connect(provider)
mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet)

mycontract.name().then((x) => {console.log("connected to contract %s", x)

	transfer_amount = value.toString()

	// we say "ether" as this is usually the default number of decimals (18)
	// but it may depend.
	// we can get the number of decimals with contract.decimals()
	converted_amount = ethers.utils.parseUnits(transfer_amount, "ether")

	mycontract.transfer(topublickey, converted_amount).then(() => {
		console.log("transfer success")
	}).catch(() => {console.log("could not transfer")})
}).catch(() => {console.log("could not connect")})
