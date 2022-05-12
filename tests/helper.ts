import { APIGatewayProxyEventBase, APIGatewayProxyEventHeaders } from "aws-lambda";

export const getRequestEvent = (method?: string, body?: string, headers?: APIGatewayProxyEventHeaders): APIGatewayProxyEventBase<{
  principalId?: string;
}> => {
  return {
    body: body || null,
    headers: headers || {},
    multiValueHeaders: {},
    httpMethod: method || 'POST',
    isBase64Encoded: false,
    path: '',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: '',
      apiId: '',
      authorizer: {
        principalId: ''
      },
      protocol: 'HTTP',
      httpMethod: method || 'POST',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        clientCert: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: '',
        user: null,
        userAgent: null,
        userArn: null,
      },
      path: '',
      stage: '',
      requestId: '',
      requestTimeEpoch: 0,
      resourceId: '',
      resourcePath: ''
    },
    resource: ''
  };
};