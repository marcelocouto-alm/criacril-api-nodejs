import { sql } from './db.js';

sql`
  CREATE TABLE Products (
    Id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    ImageUrl VARCHAR(2083) NOT NULL,
    Height NUMERIC(10, 2),
    Width NUMERIC(10, 2),
    Price NUMERIC(10, 2) NOT NULL
);
`.then(() => {
  console.log("Tabela criada com sucesso!");
})