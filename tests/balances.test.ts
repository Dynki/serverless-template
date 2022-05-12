import { lambdaWrapper } from 'serverless-jest-plugin';
import * as BalancesHandler from '../handlers/balances';
import { getRequestEvent } from './helper';

const wrapped = lambdaWrapper.wrap(BalancesHandler, { handler: 'handler' });

describe('balances', () => {
  it('returns a successful response for a Base16 Address', async () => {
    const event = getRequestEvent();
    event.pathParameters = { address: '0x59371810F0E8c8a247E02534D357322B3c981AdC' };
    const response = await wrapped.run(event);
    
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('returns a successful response for a Bech32 Address', async () => {
    const event = getRequestEvent();
    event.pathParameters = { address: 'zil1tym3sy8sary2y3lqy56dx4ej9v7fsxku52gl6z' };
    const response = await wrapped.run(event);
    
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('returns bad request if invalid address', async () => {
    const event = getRequestEvent();
    event.pathParameters = { address: 'zil1tym3sy8sary2y3lqy56dx4' };
    const response = await wrapped.run(event);
    
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
  });

  it('returns a bad request for an invalid Bech32 Address', async () => {
    const event = getRequestEvent();
    event.pathParameters = { address: 'zil1tym3sy8sary2y3lqy56dx4ej9v7fsxku52gl' };
    const response = await wrapped.run(event);
    
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
  });

  // TODO: Mock validation library to better test invalid Bech32 address.
  // TODO: Mock Zilliqa to test 500 error.
});