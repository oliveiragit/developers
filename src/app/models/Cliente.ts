export class Cliente {
  constructor() {
    this.dataCadastro = new Date();
  }
  clienteId: number;
  nome: string;
  cpf: string;
  telefone: string;
  grupoId: number;
  dataCadastro: Date;
  ativo: boolean;

}
