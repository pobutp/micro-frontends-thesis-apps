import { UrlMatcher, UrlSegment } from '@angular/router';

export function endsWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    const fullUrl = url.map((u) => u.path).join('/');
    if (fullUrl.endsWith(prefix)) {
      return { consumed: url };
    }
    return null;
  };
}

export function startsWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    const fullUrl = url.map((u) => u.path).join('/');
    if (fullUrl.startsWith(prefix)) {
      return { consumed: url };
    }
    return null;
  };
}
