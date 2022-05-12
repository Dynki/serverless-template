Serverless API Task

1. Create two serverless (lambda) functions for the following:
  a. Retrieving the XCAD token price.
  b. Retrieving the XCAD token balances of Zilliqa wallets.

2. Write functional test cases (Jest) for each handler.

3. Modify the serverless YML file to add each new serverless function.


Handler Information:

1. Modify the "price" handler to fetch the "xcad-network" price the CoinGecko API.
    - Query Prices (https://api.coingecko.com/api/v3/simple/price?ids=xcad-network&vs_currencies=usd)
    - Use the API above to query the current price for the "xcad-network" token.
    - Example Response: { 'xcad-network': { usd: 4.78 } }
    - Return the price in the API response.

2. Modify the "balance" API to query the state of a Zilliqa smart contract
    - Use the '@zilliqa-js/zilliqa' package to get the contract state of the defined address
    - Modify the handler to accept any Base16 or Bech32 address, get the balance of this address from the contract state.
        Example:
        Bech32 Address: zil1tym3sy8sary2y3lqy56dx4ej9v7fsxku52gl6z
        Base16 Address: 0x59371810F0E8c8a247E02534D357322B3c981AdC
    - Return the token balance in the API response.