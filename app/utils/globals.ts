export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

export const tokenPrice = process.env.NEXT_PUBLIC_TOKEN_PRICE

if (serverURL === null || serverURL === undefined) {
  throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is not set')
}

if (tokenPrice === null || tokenPrice === undefined) {
  throw new Error('NEXT_PUBLIC_TOKEN_PRICE environment variable is not set')
}