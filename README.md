# termo-crente
Versão bíblica do famoso jogo Termo.

## Checkpoints do Projeto 🚀

### Rota `GET /words` para resgatar todas as palavras - 🆗

 - Como Termo é basicamente um jogo de palavras, deve haver uma rota que retorne todas as palavras cadastradas na base de dados.

### Rota `POST /login` para acessar o sistema - 🆗

 - Para que os administradores acessem o sistema, será preciso realizar o login dos mesmos, retornando um token de acesso.
 - Deve ser verificado que:
   - O login só pode ser feito com uma conta válida
   - O login retorna um token de acesso

### Rota `POST /admin` para cadastrar um administrador - 🆗

 - Para poder realizar manutenções no banco de dados, será preciso cadastrar administradores. Eles poderão adicionar e remover palavras, bem como adicionar outras pessoas também.
 - Na base de dados, os valores armazenados são:
   - **id** - O `id` do administrador
   - **name** - O nome de login
   - **password** - A senha usada para obter acesso ao sistema
 - Deve ser verificado que:
   - O campo `name` possui até 20 caracteres
   - O campo `password` possui até 20 caracteres
   - O campo `password` possui, pelo menos, um número
   - Não é possível cadastrar sem os campos de `name` nem `password`
   - Não é possível cadastrar sem um token válido
   - Não é possível cadastrar um administrador com nome já cadastrado
   - O cadastro armazena corretamente no banco de dados

### Rota `POST /words` para cadastrar novas palavras

 - Para inserir de forma dinâmica as palavras na base de dados, deve haver uma rota que permita a inserção.
 - Na base de dados, os valores armazenados são:
   - **id** - O `id` da palavra cadastrada
   - **word** - A palavra cadastrada
 - Deve ser verificado que:
   - Só é possível cadastrar com um token válido
   - A palavra deve possuir 5 letras
   - Não é possível cadastrar uma palavra já cadastrada
   - O cadastro armazena corretamente no banco de dados

### Rota `DELETE /word/:word` para remover palavras

 - Para remover palavras, deve haver uma rota que permita a deleção.
 - Deve ser verificado que:
   - A palavra existe na base de dados
   - Após a remoção, a palavra deixa de existir na base de dados

_Porque a terra se encherá do conhecimento da glória do SENHOR, como as águas cobrem o mar._ Hc 2:14
