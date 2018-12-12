export type QueryMapping = { [key:string]: string };

export function getQuery(location:string = window.location.toString()): QueryMapping {
    const query = (location.split('?')[1] || '').split('#')[0];

    const qs: QueryMapping = {};

    if (query.length > 0) {
        query.split('&').forEach((segment, i) => {
            const parts = segment.split('=');
            if(parts && parts.length === 2) {
                const key = decodeURIComponent(parts[0]);
                qs[key] = parts[1];
            }
        });
    }

    return qs;
  }