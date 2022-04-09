import { Ipware } from '@fullerstack/nax-ipware';

export default (() => {
  const ipWare = new Ipware();

  const getIP = (req: any): string => {
    return ipWare.getClientIP(req)?.ip || '';
  };

  return { getIP };
})();
