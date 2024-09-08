/**
 * (C) Copyright 2023, Scaleton Labs LLC
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Address, Cell, ContractProvider, Sender } from '@ton/core';
import { SwapParams, SwapStep, Vault } from './Vault';
import { Asset, ReadinessStatus } from '../common';
import { PoolType } from '../pool';
export declare class VaultNative extends Vault {
    readonly address: Address;
    static readonly DEPOSIT_LIQUIDITY = 3579725446;
    static readonly SWAP = 3926267997;
    protected constructor(address: Address);
    static createFromAddress(address: Address): VaultNative;
    getReadinessStatus(provider: ContractProvider): Promise<ReadinessStatus>;
    sendDepositLiquidity(provider: ContractProvider, via: Sender, { queryId, amount, poolType, assets, minimalLPAmount, targetBalances, fulfillPayload, rejectPayload, }: {
        queryId?: bigint | number;
        amount: bigint;
        poolType: PoolType;
        assets: [Asset, Asset];
        minimalLPAmount?: bigint;
        targetBalances: [bigint, bigint];
        fulfillPayload?: Cell | null;
        rejectPayload?: Cell | null;
    }): Promise<void>;
    sendSwap(provider: ContractProvider, via: Sender, { queryId, amount, poolAddress, limit, swapParams, next, gasAmount, }: {
        queryId?: bigint | number;
        amount: bigint;
        poolAddress: Address;
        limit?: bigint;
        swapParams?: SwapParams;
        next?: SwapStep;
        gasAmount?: bigint;
    }): Promise<void>;
    createSwap(provider: ContractProvider & {
        internalArgs: any;
    }, { queryId, amount, poolAddress, limit, swapParams, next, gasAmount, }: {
        queryId?: bigint | number;
        amount: bigint;
        poolAddress: Address;
        limit?: bigint;
        swapParams?: SwapParams;
        next?: SwapStep;
        gasAmount?: bigint;
    }): Promise<any>;
    send(provider: ContractProvider, via: Sender & {
        sends: any;
    }, messages: any[]): Promise<void>;
}
