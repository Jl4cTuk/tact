import { Address, toNano } from '@ton/core';
import { Proxy } from '../wrappers/Proxy';
import { NetworkProvider } from '@ton/blueprint';


export async function run(provider: NetworkProvider) {
    const sender = provider.sender();
    const proxy = provider.open(Proxy.fromAddress(Address.parse("kQAq-pCkOp7ASdT-DthY19Ds48ccfuMZQLw0F3DFnA_4vkJW"))); 

    await proxy.send(
        provider.sender(),
        { value: toNano("0.1") },
        {
            $$type: "ProxyMessage",
            str: "hello ton",
            to: Address.parse("0QAXAkzpwZzpO5E-LsxFcyGAmm56cLXmJqU2aYnyRew671WL"),
        }
    );
}