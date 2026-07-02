import { useInfiniteQuery } from '@tanstack/react-query'
import { isFirebaseConfigured } from '../lib/firebaseConfig'
import {
  SERVICES_PAGE_SIZE,
  fetchServicesPage,
  sortServices,
} from '../lib/servicesRepository'

export const adminServicesQueryKey = ['admin-services-pages']

export function useAdminServicesPage() {
  const query = useInfiniteQuery({
    queryKey: adminServicesQueryKey,
    enabled: isFirebaseConfigured,
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      fetchServicesPage({ pageSize: SERVICES_PAGE_SIZE, cursor: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.cursor : undefined),
    select: (data) => ({
      pages: data.pages,
      services: sortServices(data.pages.flatMap((page) => page.items)),
      hasMore: Boolean(data.pages.at(-1)?.hasMore),
    }),
    staleTime: 30_000,
  })

  if (!isFirebaseConfigured) {
    return {
      services: [],
      loading: false,
      error: 'Firebase is not configured.',
      hasMore: false,
      loadMore: () => {},
      isFetchingMore: false,
    }
  }

  return {
    services: query.data?.services ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    hasMore: query.data?.hasMore ?? false,
    loadMore: () => query.fetchNextPage(),
    isFetchingMore: query.isFetchingNextPage,
  }
}
