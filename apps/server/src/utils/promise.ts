type Result<T> = [T, null] | [null, Error]

export async function promise<T>(promiseData: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promiseData
    return [data, null]
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}
