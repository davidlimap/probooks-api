import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

describe('UsuarioController', () => {
  let app;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  it('deve inserir um novo usuário', async () => {

    const response = await request(app.getHttpServer())
      .post('/usuario')
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body.usuario).toHaveProperty('id');
    expect(response.body.usuario.nome).toBe(novoUsuario.nome);
    expect(response.body.usuario.email).toBe(novoUsuario.email);
  });

  it('deve listar todos os usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuario');

    expect(response.status).toBe(200);
    expect(response.body.usuarios).toBeInstanceOf(Array);
  });

  it('deve não adicionar um usuário com email já existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuario')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Já existe um usuário com este e-mail");
  });

  it('deve não adicionar um usuário com email inválido', async () => {

    const emailInvalido = {
      nome: 'Matheus',
      email: 'matheususuario.com',
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
      .send(emailInvalido);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("O e-mail informado é inválido");
  });

  afterAll(async () => {
    await app.close();
  });
});