export const serverURL = process.env.SERVER_URL

if (serverURL === null) {
  throw new Error('SERVER_URL environment variable is not set')
}
