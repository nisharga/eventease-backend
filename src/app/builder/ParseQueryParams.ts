export const parseQueryParams = (
  query: Record<string, unknown>,
  typeMap: Record<string, 'boolean' | 'number'>,
): Record<string, unknown> => {
  const parsedQuery: Record<string, unknown> = {}
  Object.entries(query).forEach(([key, value]) => {
    if (typeMap[key] === 'boolean') {
      parsedQuery[key] = value === 'true'
    } else if (typeMap[key] === 'number') {
      parsedQuery[key] = Number(value)
    } else {
      parsedQuery[key] = value
    }
  })
  return parsedQuery
}
