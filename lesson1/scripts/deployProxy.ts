import { toNano } from '@ton/core';
import { Proxy } from '../wrappers/Proxy';
import { NetworkProvider } from '@ton/blueprint';


export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address;
    if (!owner) {
        console.log("Owner address is undefined");
        return;
    }
    const init = await Proxy.init(owner);
    const contract = provider.open(await Proxy.fromInit(owner));
    console.log(`Deploying Proxy contract at: ${contract.address}`);
    await contract.send(provider.sender(), { value: toNano("0.05") }, "Deploy");
    console.log("✅ Proxy contract deployed successfully!")
}