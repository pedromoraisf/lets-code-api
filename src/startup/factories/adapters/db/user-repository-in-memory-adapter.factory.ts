import { UserRepositoryInMemoryAdapter } from '@src/adapters/db'

export const makeUserRepositoryInMemoryAdapter = () => new UserRepositoryInMemoryAdapter()
