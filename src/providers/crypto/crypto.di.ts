import { container } from 'tsyringe';

import CryptoService from './crypto.service';
import { CryptoInject } from './crypto.type';
import { ICryptoService } from './interface';

container.registerInstance<ICryptoService>(
  CryptoInject.CRYPTO_SERVICE,
  new CryptoService(),
);
