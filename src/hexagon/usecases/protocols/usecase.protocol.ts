export interface UseCase<T, Y> {
  execute: (data: T) => Promise<Y>
}
