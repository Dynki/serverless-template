/**
 * Query Prices Proxy API
 * Create an API to query and return the current XCAD price.
 * 
 * https://api.coingecko.com/api/v3/simple/price?ids=xcad-network&vs_currencies=usd
 * 
 * Use the API above to query the current price for the "xcad-network" token.
 * This price value will need to be displayed on the client-side.
 * 
 * Example Response: { 'xcad-network': { usd: 4.78 } }
 */

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import axios from 'axios';

const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
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

export const handler: APIGatewayProxyHandler = async (event, _context) => {

  let response;
  try {
    response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=xcad-network&vs_currencies=usd');
  } catch (error) {
    return apiResponses._500({ message: "Network error" });
    // Add logging here to track error.  
  }

  return apiResponses._200({ ...response.data });
}