-- CreateTable
CREATE TABLE "profissional" (
    "id_profissional" TEXT NOT NULL,
    "nome_profissional" VARCHAR(100),
    "data_nascimento" DATE,
    "cpf" VARCHAR(11),
    "crp" VARCHAR(20),
    "logradouro" VARCHAR(100),
    "bairro" VARCHAR(50),
    "numero" VARCHAR(10),
    "complemento" VARCHAR(50),
    "cep" VARCHAR(10),
    "cidade" VARCHAR(50),
    "uf" VARCHAR(2),
    "telefone" VARCHAR(15),
    "email" VARCHAR(100),
    "senha_hash" VARCHAR(100),
    "is_social" BOOLEAN,

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id_profissional")
);
