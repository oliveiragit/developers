export class Cliente {
  constructor() {
    this.dataCadastro = new Date();
  }
  clienteId: number;
  nome: string;
  cpf: string;
  dataCadastro: Date;
  grupoId: number;
  ativo: boolean;
  telefone: string;
}
