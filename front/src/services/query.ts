export function query<T>(name: keyof WindowBinding, ...args: unknown[]) {
  return new Promise<T>((resolve, reject) => {
    window[name]({
      request: JSON.stringify(args),
      onSuccess: (response) => {
        console.log('Success', response)
        resolve(JSON.parse(response))
      },
      onFailure: (code, message) => {
        console.error(code, message)
        reject('Error')
      },
    })
  })
}
