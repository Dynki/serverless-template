import { lambdaWrapper } from 'serverless-jest-plugin';
import * as PriceHandler from '../handlers/price';
import { getRequestEvent } from './helper';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const wrapped = lambdaWrapper.wrap(PriceHandler, { handler: 'handler' });

describe('prices', () => {

  it('Verifies Successful Response', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          'xcad-network': 12.23
        }
      ],
    });

    const event = getRequestEvent();
    const response = await wrapped.run(event);
    
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('Return 500 if general error', async () => {
    mockedAxios.get.mockRejectedValueOnce({error:"Network error"});

    const event = getRequestEvent();
    const response = await wrapped.run(event);

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
  });
});