import { Ipware } from '@fullerstack/nax-ipware';

const ipWare = new Ipware();

export const getIP = (req: any): string => ipWare.getClientIP(req)?.ip || '';
