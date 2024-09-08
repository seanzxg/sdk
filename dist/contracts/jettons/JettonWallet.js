"use strict";
/**
 * (C) Copyright 2023, Scaleton Labs LLC
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonWallet = void 0;
const core_1 = require("@ton/core");
class JettonWallet {
    address;
    static TRANSFER = 0xf8a7ea5;
    static TRANSFER_NOTIFICATION = 0x7362d09c;
    static INTERNAL_TRANSFER = 0x178d4519;
    static BURN = 0x595f07bc;
    static EXCESSES = 0xd53276db;
    constructor(address) {
        this.address = address;
    }
    static createFromAddress(address) {
        return new JettonWallet(address);
    }
    async sendTransfer(provider, via, value, { queryId, amount, destination, responseAddress, customPayload, forwardAmount, forwardPayload, }) {
        await provider.internal(via, {
            value,
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(JettonWallet.TRANSFER, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeAddress(destination)
                .storeAddress(responseAddress)
                .storeMaybeRef(customPayload)
                .storeCoins(forwardAmount ?? 0)
                .storeMaybeRef(forwardPayload)
                .endCell(),
        });
    }
    async getTransfer(provider, value, { queryId, amount, destination, responseAddress, customPayload, forwardAmount, forwardPayload, }) {
        return await provider.internalArgs({
            value,
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(JettonWallet.TRANSFER, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeAddress(destination)
                .storeAddress(responseAddress)
                .storeMaybeRef(customPayload)
                .storeCoins(forwardAmount ?? 0)
                .storeMaybeRef(forwardPayload)
                .endCell(),
        });
    }
    async sendBurn(provider, via, value, { queryId, amount, responseAddress, customPayload, }) {
        await provider.internal(via, {
            value,
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(JettonWallet.BURN, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeAddress(responseAddress)
                .storeMaybeRef(customPayload)
                .endCell(),
        });
    }
    async getWalletData(provider) {
        const result = await provider.get('get_wallet_data', []);
        const balance = result.stack.readBigNumber();
        const ownerAddress = result.stack.readAddress();
        const minterAddress = result.stack.readAddress();
        const walletCode = result.stack.readCell();
        return {
            balance,
            ownerAddress,
            minterAddress,
            walletCode,
        };
    }
    async getBalance(provider) {
        const { balance } = await this.getWalletData(provider);
        return balance;
    }
}
exports.JettonWallet = JettonWallet;
//# sourceMappingURL=JettonWallet.js.map