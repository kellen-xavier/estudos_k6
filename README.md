# Projeto de Testes de Performance com K6

Este projeto foi desenvolvido com o objetivo de realizar testes de performance em APIs utilizando o K6. A automação de testes que você encontrará aqui foi originalmente desenvolvida para um ambiente real, mas, por questões de confidencialidade, todas as referências e dados específicos foram removidos.

## Propósito e Contexto

O foco deste projeto é demonstrar as boas práticas de testes de performance com K6, mantendo a estrutura e lógica dos testes, sem comprometer a confidencialidade dos dados originais. A ideia é compartilhar um exemplo de automação de testes que pode ser reutilizado em diferentes contextos de APIs, independentemente do ambiente real para o qual foi criado.

## Estrutura do Projeto

Este projeto contém scripts de teste desenvolvidos para verificar limites de acesso, performance e autenticação em APIs. </br>
Os testes utilizam massa de dados dinâmica carregada de arquivos JSON para simular cenários variados.

### Confidencialidade e Privacidade

Todo o código e dados foram adaptados

- **Remoção de nomes e URLs específicas**
- **Dados sensíveis removidos**: Senhas, tokens de autenticação e dados confidenciais foram substituídos por placeholders (`PLACEHOLDER_PASSWORD`, `PLACEHOLDER_TOKEN`, etc.).
- **Nomes de usuários genéricos**: Nomes específicos de usuários utilizados nos testes foram substituídos por valores genéricos, como `user001`, `user002`, etc.

## Estrutura de pastas

- [scripts: conteúdo dos testes](src/scripts)
- [users: pasta com massa de dados de usuários](src/users)
- [shared](src/shared)

## Observação

> Este projeto é compartilhado para fins educacionais e de portfólio, com o objetivo de demonstrar as capacidades do K6 para automação de testes de performance. Nenhuma informação sensível ou dados proprietários foram expostos neste repositório

## Contribuição

> Se você deseja contribuir com este projeto, sinta-se à vontade para sugerir melhorias de performance, correções de bugs ou novas ideias de testes
