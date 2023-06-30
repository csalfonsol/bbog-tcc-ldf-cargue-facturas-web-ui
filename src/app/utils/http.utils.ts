import { HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export function isExternalHttpRequest(request: HttpRequest<unknown>) {
  return !request.url.includes(environment._url);
}

