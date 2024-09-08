"use strict";
/**
 * (C) Copyright 2023, Scaleton Labs LLC
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultNative = void 0;
const core_1 = require("@ton/core");
const Vault_1 = require("./Vault");
const common_1 = require("../common");
class VaultNative extends Vault_1.Vault {
    address;
    static DEPOSIT_LIQUIDITY = 0xd55e4686;
    static SWAP = 0xea06185d;
    constructor(address) {
        super(address);
        this.address = address;
    }
    static createFromAddress(address) {
        return new VaultNative(address);
    }
    async getReadinessStatus(provider) {
        const state = await provider.getState();
        if (state.state.type !== 'active') {
            return common_1.ReadinessStatus.NOT_DEPLOYED;
        }
        return common_1.ReadinessStatus.READY;
    }
    async sendDepositLiquidity(provider, via, { queryId, amount, poolType, assets, minimalLPAmount, targetBalances, fulfillPayload, rejectPayload, }) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(VaultNative.DEPOSIT_LIQUIDITY, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeUint(poolType, 1)
                .storeSlice(assets[0].toSlice())
                .storeSlice(assets[1].toSlice())
                .storeRef((0, core_1.beginCell)()
                .storeCoins(minimalLPAmount ?? 0)
                .storeCoins(targetBalances[0])
                .storeCoins(targetBalances[1])
                .endCell())
                .storeMaybeRef(fulfillPayload)
                .storeMaybeRef(rejectPayload)
                .endCell(),
            value: amount + (0, core_1.toNano)('0.15'),
        });
    }
    async sendSwap(provider, via, { queryId, amount, poolAddress, limit, swapParams, next, gasAmount, }) {
        await provider.internal(via, {
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(VaultNative.SWAP, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeAddress(poolAddress)
                .storeUint(0, 1)
                .storeCoins(limit ?? 0)
                .storeMaybeRef(next ? Vault_1.Vault.packSwapStep(next) : null)
                .storeRef(Vault_1.Vault.packSwapParams(swapParams ?? {}))
                .endCell(),
            value: amount + (gasAmount ?? (0, core_1.toNano)('0.2')),
        });
    }
    async getSwap(provider, { queryId, amount, poolAddress, limit, swapParams, next, gasAmount, }) {
        return await provider.internalArgs({
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
            body: (0, core_1.beginCell)()
                .storeUint(VaultNative.SWAP, 32)
                .storeUint(queryId ?? 0, 64)
                .storeCoins(amount)
                .storeAddress(poolAddress)
                .storeUint(0, 1)
                .storeCoins(limit ?? 0)
                .storeMaybeRef(next ? Vault_1.Vault.packSwapStep(next) : null)
                .storeRef(Vault_1.Vault.packSwapParams(swapParams ?? {}))
                .endCell(),
            value: amount + (gasAmount ?? (0, core_1.toNano)('0.2')),
        });
    }
    async send(provider, via, messages) {
        await via.sends({
            msgs: messages,
        });
    }
}
exports.VaultNative = VaultNative;
//# sourceMappingURL=VaultNative.js.map