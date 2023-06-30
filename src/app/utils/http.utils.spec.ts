import { HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isExternalHttpRequest } from './http.utils';

const mockEnvironment = {
  http: {
    host: 'http://host',
    services: {
      testApi: 'v1/test-api',
    },
  },
};

describe('isExternalHttpRequest', () => {
    it('should return true when is external url', () => {
        const result = isExternalHttpRequest({ url: 'http://external.test' } as any);
        expect(result).toBeTruthy();
    });

    it('should return false when is internal url', () => {
        const result = isExternalHttpRequest({ url: environment._url } as any);
        expect(result).toBeFalsy();
    });
});

