/**
 * (C) Copyright 2023, Scaleton Labs LLC
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Address, Cell, Contract, ContractProvider, Sender } from '@ton/core';
export declare class JettonWallet implements Contract {
    readonly address: Address;
    static readonly TRANSFER = 260734629;
    static readonly TRANSFER_NOTIFICATION = 1935855772;
    static readonly INTERNAL_TRANSFER = 395134233;
    static readonly BURN = 1499400124;
    static readonly EXCESSES = 3576854235;
    constructor(address: Address);
    static createFromAddress(address: Address): JettonWallet;
    sendTransfer(provider: ContractProvider, via: Sender, value: bigint, { queryId, amount, destination, responseAddress, customPayload, forwardAmount, forwardPayload, }: {
        queryId?: number | bigint;
        destination: Address;
        amount: bigint;
        responseAddress?: Address | null;
        customPayload?: Cell;
        forwardAmount?: bigint;
        forwardPayload?: Cell;
    }): Promise<void>;
    getTransfer(provider: ContractProvider & {
        internalArgs: any;
    }, value: bigint, { queryId, amount, destination, responseAddress, customPayload, forwardAmount, forwardPayload, }: {
        queryId?: number | bigint;
        destination: Address;
        amount: bigint;
        responseAddress?: Address | null;
        customPayload?: Cell;
        forwardAmount?: bigint;
        forwardPayload?: Cell;
    }): Promise<any>;
    sendBurn(provider: ContractProvider, via: Sender, value: bigint, { queryId, amount, responseAddress, customPayload, }: {
        queryId?: number | bigint;
        amount: bigint;
        responseAddress?: Address | null;
        customPayload?: Cell;
    }): Promise<void>;
    getWalletData(provider: ContractProvider): Promise<{
        balance: bigint;
        ownerAddress: Address;
        minterAddress: Address;
        walletCode: Cell;
    }>;
    getBalance(provider: ContractProvider): Promise<bigint>;
}
