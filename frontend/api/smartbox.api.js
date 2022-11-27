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
  getAllUsers: request('users'),
  getAllDoors: request('doors'),
  getAllPackagesByUserId: (userId) => request(`packages/user/${userId}`),
  getLogsByUserId: (userId) => request(`logs/${userId}`),
  newUser: (newUserDto) => request('users', {
    method: 'POST',
    body: JSON.stringify(newUserDto)
  }),
  requireDoor: (doorRequestDto) => request('doors/new-door', {
    method: 'POST',
    body: JSON.stringify(doorRequestDto)
  }),
  login: (loginDto) => request('users/login', {
    method: 'POST',
    body: JSON.stringify(loginDto)
  })
}
