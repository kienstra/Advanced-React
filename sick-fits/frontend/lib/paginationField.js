import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read number of items on page from the cache.
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const totalPages = Math.ceil(count / first);
      // First thing is asks read() for items.
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === totalPages) {
        return items;
      }

      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing, incoming, {args}) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
