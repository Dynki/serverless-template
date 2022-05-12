/**
 * Query Contract Balances from the Zilliqa Chain
 * 
 * Use the "@zilliqa-js/zilliqa" package to query the defined contract below and get the state.
 * The state will return all mutable fields on a smart contract and their current values.
 * 
 * Modify the handler below to accept an "address" string.
 * The address can either be Bech32 or Base16 format (see Zilliqa for more details)
 * Query the defined contract below to get the current state.
 * Find and return the balance of the "address".
 */

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Zilliqa } from '@zilliqa-js/zilliqa';
import  { fromBech32Address, isValidChecksumAddress } from '@zilliqa-js/crypto';
import { validation } from '@zilliqa-js/util';

const zilliqa = new Zilliqa('https://api.zilliqa.com/');

type ContractBalance = {
  [key: string]: string;
}

type ContractAllowances = {
  [key: string]: ContractBalance
}

const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2),
    };
  },
  _500: (body: { [key: string]: any }) => {
    return {
      statusCode: 500,
      body: JSON.stringify(body, null, 2),
    };
  }
};

export type ContractState = {
  _balance: string;
  allowances: ContractAllowances;
  balances: ContractBalance;
  contractowner: string;
  lock_proxy: string;
  total_supply: string;
}

const validateAddress = address => {
  let validatedAddress;
  try {
    const normaliseAddress = address => validation.isBech32(address) ? fromBech32Address(address) : address;
    validatedAddress = normaliseAddress(address);
  } catch (error) {
    return undefined;
  }

  if (!isValidChecksumAddress(validatedAddress)) {
    return undefined;
  }

  return validatedAddress;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {

  const address = validateAddress(event.pathParameters?.address);

  if (!address) {
    return apiResponses._400({ message: 'missing or invalid address'});
  }

  let response;
  try {
    response = await zilliqa.blockchain.getBalance(address);
  } catch (error) {
    return apiResponses._500({ message: "An unexpected error occurred" });
    // Add logging here to track error.  
  }

  return apiResponses._200({ balance: response.result.balance });
}