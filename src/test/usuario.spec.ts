import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';

describe('UsuarioController', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('deve inserir um novo usuário', async () => {
    const novoUsuario = {
      nome: 'Matheus',
      email: 'matheus@usuario.com',
      senha: 'Teste-123',
      cpf: '09245326705',
      telefone: '21983578705',
      enderecos: [{
        rua: 'Rua Sgt Joao',
        numero: '22',
        complemento: 'sem complemento',
        bairro: 'Sao Vicente',
        cidade: 'Belford Roxo',
        estado: 'Rio de Janeiro',
        cep: '26178360'
      }]
    };

    const response = await request(app.getHttpServer())
      .post('/usuario')
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body.usuario).toHaveProperty('id');
    expect(response.body.usuario.nome).toBe(novoUsuario.nome);
    expect(response.body.usuario.email).toBe(novoUsuario.email);
  });

  afterAll(async () => {
    await app.close();
  });
});