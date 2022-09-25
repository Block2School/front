export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

if (serverURL === null || serverURL === undefined) {
  throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is not set')
}
