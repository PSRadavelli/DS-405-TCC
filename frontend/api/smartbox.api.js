const request = (
  path,
  options = undefined,
  headers = undefined
) => {
  return async () => {
    const response = await fetch(`https://tcc-cotuca-backend.viniciusgranado.repl.co/${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...headers }
    })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    if (response.status === 204) {
      return
    }

    return response.json()
  }
}

export const smartboxApi = {
  getAllUsers: request('users')
}
