import { sql } from './db.js';

sql`
  CREATE TABLE Users (
    Id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    CreatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UpdatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );
`.then(() => {
  console.log("Tabela Users criada com sucesso!");
  return sql`
    CREATE OR REPLACE FUNCTION update_users_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.UpdatedAt = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
}).then(() => {
  console.log("Função de atualização para UpdatedAt criada com sucesso!");
  return sql`
    CREATE TRIGGER set_users_updated_at
    BEFORE UPDATE ON Users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();
  `;
}).then(() => {
  console.log("Trigger criado com sucesso!");
}).catch((error) => {
  console.error("Erro ao criar a tabela Users ou configurações:", error);
});