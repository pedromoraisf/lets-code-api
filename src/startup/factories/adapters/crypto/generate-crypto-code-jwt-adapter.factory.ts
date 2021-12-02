import { GenerateEncryptedCodeJwtAdapter } from '@src/adapters/crypto'

export const makeGenerateCryptoCodeJwtAdapter = () => new GenerateEncryptedCodeJwtAdapter()
