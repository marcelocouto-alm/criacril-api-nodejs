import { sql } from './db.js';

sql`
  CREATE TABLE Products (
    Id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    ImageUrl VARCHAR(2083) NOT NULL,
    Height NUMERIC(10, 2),
    Width NUMERIC(10, 2),
    Price NUMERIC(10, 2) NOT NULL,
    CreatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UpdatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );
`.then(() => {
  console.log("Tabela criada com sucesso!");
  return sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.UpdatedAt = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
}).then(() => {
  console.log("Função de atualização criada com sucesso!");
  return sql`
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON Products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `;
}).then(() => {
  console.log("Trigger criado com sucesso!");
}).catch((error) => {
  console.error("Erro ao criar a tabela ou configurações:", error);
});
