module.exports = {
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/.next/', '/node_modules'],
}
