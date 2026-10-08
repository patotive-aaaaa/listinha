Qual a diferença entre uma coleção e um documento no Firestore? Dê um exemplo usando a Lista de Compras.
Uma coleção é como uma pasta que reúne vários documentos relacionados. Já um documento é um registro individual dentro dessa coleção, contendo campos e valores. Por exemplo: no projeto há a coleção "produtos". E dentro dela pode existir documentos como: "abc123" -> nome: maçã; comprado: false; criadoEm: 8 de outubro de 2026... . "def456" -> nome: abacate; comprado: true; criadoEm: ... .

Para que serve o comando npm install firebase? Em qual arquivo você confirma que ele funcionou?
Serve para instalar o Firebase como dependência do projeto, permitindo utilizar recursos como o Firestore no código. Pode-se confirmar que ele foi instalado no arquivo "package.json" na seção "dependencies".

Por que as variáveis do .env precisam começar com VITE_ neste projeto? O que muda se o app for feito em Expo (React Native)?
As variáveis do arquivo .env precisam começar com VITE_ quando o projeto utiliza Vite, pois esse prefixo permite que elas sejam disponibilizadas para o código da aplicação. Porém, neste projeto é utilizado o Expo, que possui uma forma diferente de trabalhar com variáveis de ambiente. No Expo, as variáveis que precisam ser acessadas pelo aplicativo devem começar com EXPO_PUBLIC_, como EXPO_PUBLIC_FIREBASE_API_KEY. Portanto, ao utilizar Expo, em vez de VITE_, usamos EXPO_PUBLIC_ e acessamos essas variáveis por meio de process.env.

Qual a diferença entre getDocs e onSnapshot? Em que situação cada um é mais útil?
A principal diferença entre getDocs e onSnapshot é que getDocs realiza uma consulta aos documentos apenas uma vez, enquanto onSnapshot mantém uma observação em tempo real, recebendo automaticamente as alterações feitas no banco. Assim, getDocs é mais útil quando precisamos apenas consultar os dados em determinado momento, enquanto onSnapshot é mais adequado para situações em que queremos que a aplicação seja atualizada automaticamente quando os dados forem modificados.

Por que usamos serverTimestamp() no campo criadoEm em vez da hora do computador do usuário?
Utilizamos serverTimestamp() no campo criadoEm para que o horário seja definido pelo servidor do Firebase, em vez de depender do relógio do dispositivo do usuário. Isso evita problemas causados por horários configurados incorretamente no computador ou celular e garante uma referência de tempo mais consistente para os registros.

O banco foi criado em modo de teste. Por que esse modo não serve para um app publicado de verdade? (Consulte a referência sobre regras de segurança.)
O modo de teste não é adequado para um aplicativo publicado porque suas regras de segurança são muito permissivas, permitindo que os dados do banco possam ser acessados ou modificados sem as restrições necessárias. Embora esse modo facilite os testes durante o desenvolvimento, em um aplicativo real é necessário configurar regras de segurança que determinem quem pode ler, criar, alterar ou excluir os dados, evitando acessos e modificações indevidas.