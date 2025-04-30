import { EndpointConfig } from '@adapters/ServerAdapter';
import { IUserConfigs } from './IUserConfigs';

export class IUserConfigsImpl implements IUserConfigs {
  registerConfig(): EndpointConfig {
    return {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    };
  }

  loginConfig(): EndpointConfig {
    return {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      }
    }
  }

  confirmMailConfig(): EndpointConfig {
      return {
        rateLimit: {
          max: 5,
          timeWindow: '15 minute',
          errorResponseBuilder: (req, context) => {
              return {
                statusCode: 429,
                error: 'Too many mistakes envolving email confirmation',
                message: `Rate limit exceeded. Try again after ${context.after} so you may register again`
              }
          },
        },
      }
  }
}

const iUserConfigs = new IUserConfigsImpl();

export { iUserConfigs };