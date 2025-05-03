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
  
  confirmMailConfig(): EndpointConfig {
      return {
        rateLimit: {
          max: 5,
          timeWindow: '15 minutes',
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

  resendVerificationTokenConfig(): EndpointConfig {
    return {
      rateLimit: {
        max: 5,
        timeWindow: '15 minutes',
        errorResponseBuilder: (req, context) => {
          return {
            statusCode: 429,
            error: 'Too many mistakes envolving resending verification token',
            message: `Rate limit exceeded. Try again after ${context.after} so you may register again`
          }
      },
      }
    }    
  }

  loginConfig(): EndpointConfig {
    return {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      }
    }
  }

}

const iUserConfigs = new IUserConfigsImpl();

export { iUserConfigs };