INSERT INTO USUARIOS (nome, login, senha, perfil, departamento) VALUES ('Neuci', 'neuci', '03A8A64F9CA460B0EB5466666BFCDD83', 'faturamento', 'fiscal')
INSERT INTO USUARIOS (nome, login, senha, perfil, departamento) VALUES ('Rita', 'rita', '2794D223F90059C9F705C73A99384085', 'financeiro', 'financeiro')
INSERT INTO USUARIOS (nome, login, senha, perfil, departamento) VALUES ('Marisa', 'marisa', '458FF389547C5068DC72CF9B79EBCEBD', 'cobranca', 'cobranca')

INSERT INTO ERR (erro, mensagem) VALUES ('1123', 'Já existe um titulo com o mesmo valor do campo Nosso Numero, Parcela e Carteira.')
INSERT INTO ERR (erro, mensagem) VALUES ('1234', 'Já existe um lançamento com o mesmo valor do campo ''Nosso Numero''. Para resolver o problema clique no botão ao lado do campo para carregar o próximo número disponível.')
INSERT INTO ERR (erro, mensagem) VALUES ('7010', 'Esta tarefa já foi concluída.')
INSERT INTO ERR (erro, mensagem) VALUES ('7450', 'Você não pode atualizar esta tarefa porque não esta com as últimas alterações. Abra a tarefa novamente pra ver as alterações, caso tenha feito alguma mudança elas serão perdidas.')
INSERT INTO ERR (erro, mensagem) VALUES ('7451', 'A tarefa que você esta tentando alterar esta desatualizada, você esta vendo uma versão anterior, sem as últimas alterações. Abra a tarefa novamente pra ver as alterações, caso tenha feito alguma mudança elas serão perdidas.')

INSERT INTO CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRADESCO', '0', '0', 0, 'BRADESCO - GARANTIA', 250, 3.5, 3.5)
INSERT INTO CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRADESCO', '0', '0', 0, 'BRADESCO - DESCONTO', 250, 3.5, 3.5)
INSERT INTO CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRASIL', '0', '0', 0, 'BRASIL - GARANTIA', 250, 3.5, 3.5)
INSERT INTO CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('ITAU', '0', '0', 0, 'ITAU - DESCONTO', 340, 3.5, 3.67)