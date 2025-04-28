import { EndpointConfig } from '@adapters/ServerAdapter';
import { IUserConfigs } from './IUserConfigs';

export class IUserConfigsImpl implements IUserConfigs {
  registerConfig(): EndpointConfig {
    return {
      rateLimit: {
        max: 3,
        timeWindow: '1 minute',
      },
    };
  }
}

const iUserConfigs = new IUserConfigsImpl();

export { iUserConfigs };