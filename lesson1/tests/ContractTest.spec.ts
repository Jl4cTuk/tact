import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Proxy } from '../build/Proxy/tact_Proxy';
import '@ton/test-utils';
import { inspect } from "util";

describe('Proxy Contract', () => {
    let blockchain: Blockchain;
    let owner: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user2: SandboxContract<TreasuryContract>;
    let contractTest: SandboxContract<Proxy>;

    it('should work', async () => {
        blockchain = await Blockchain.create();
        owner = await blockchain.treasury('owner');
        user1 = await blockchain.treasury('user1');
        user2 = await blockchain.treasury('user2');

        
        contractTest = blockchain.openContract(await Proxy.fromInit(owner.address));

        const res = await contractTest.send(
            user1.getSender(),
            { value: toNano("0.1") },
            { $$type: 'ProxyMessage', str: "Hello", to: user2.address }
        );

        let count = await contractTest.getGetCount();
        expect(count).toEqual(1n);

        let lastMessage = await contractTest.getGetLast();
        expect(lastMessage.last_message).toEqual("Hello");
        expect(lastMessage.last_receiver)?.toEqualAddress(user2.address);
        expect(lastMessage.last_sender)?.toEqualAddress(user1.address);

        // expect(res.events).toMatchSnapshot(); - щас не работает такое
    });
});
