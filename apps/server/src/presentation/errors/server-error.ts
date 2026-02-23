export class ServerError extends Error {
  constructor() {
    super(
      'O núcleo mágico do servidor entrou em colapso. Não foi você, foi o cansaço do dragão que o alimenta.',
    )
    this.name = 'ServerError'

    Object.setPrototypeOf(this, ServerError.prototype)
  }
}
