import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";
import { Wallet, JsonRpcProvider, utils } from "ethers";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID = "0x7996c7036f295c54113234996abab368215551df51e364362b04a6e833b99d70";
const eas = new EAS(easContractAddress);

const provider = new JsonRpcProvider(process.env.PONDER_SEPOLIA_RPC_URL!);
const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

const issueAttestation = async ({ recipient, level, reason }) => {

	await eas.connect(signer);

	const schemaEncoder = new SchemaEncoder("string level,string reason");
	const encodedData = schemaEncoder.encodeData([
		{ name: "level", value: level, type: "string" },
		{ name: "reason", value: reason, type: "string" },
	]);
	const tx = await eas.attest({
		schema: schemaUID,
		data: {
			recipient: recipient,
			expirationTime: 0,
			revocable: true,
			data: encodedData,
		},
	});
	const newAttestationUID = await tx.wait();
	return newAttestationUID;
};

const revokeAttestation = async (attestationUID) => {
	await eas.connect(signer);
	const data = utils.formatBytes32String(attestationUID);
	const transaction = await eas.revokeOffchain(data);
	await transaction.wait();

	const tx = await eas.revoke({ uid: attestationUID });
	await tx.wait();
}

export const manageAccountAttestation = async ({ account, newTotalStaked }) => {
	// if (account.attestationUID) {
	// 	revokeAttestation(account.attestationUID)
	// }
	const newAttestationUID = await issueAttestation({
		recipient: account.address,
		level: "level " + newTotalStaked + " staker",
		reason: "staked " + newTotalStaked + " NFT's" ,
	})

	return newAttestationUID
}