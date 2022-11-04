import { container } from 'tsyringe';

import GoogleService from './google.service';
import { GoogleInject } from './google.type';
import { IGoogleService } from './interface';

container.registerInstance<IGoogleService>(
  GoogleInject.GOOGLE_SERVICE,
  new GoogleService(),
);
