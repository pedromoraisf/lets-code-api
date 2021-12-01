export interface UseCase<T = any, Y = any> {
  execute: (data: T) => Promise<Y>
}
