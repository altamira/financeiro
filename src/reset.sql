DELETE FROM FINANCEIRO.dbo.TRFN;
DELETE FROM FINANCEIRO.dbo.TRF;
DELETE FROM FINANCEIRO.dbo.RET_PAR;
DELETE FROM FINANCEIRO.dbo.RET;
DELETE FROM FINANCEIRO.dbo.REM_PAR;
DELETE FROM FINANCEIRO.dbo.REM;
DELETE FROM FINANCEIRO.dbo.COB_PAR;
DELETE FROM FINANCEIRO.dbo.COB;
DELETE FROM FINANCEIRO.dbo.REC_PAR;
DELETE FROM FINANCEIRO.dbo.REC_PED;
DELETE FROM FINANCEIRO.dbo.REC_REP;
DELETE FROM FINANCEIRO.dbo.REC;
DELETE FROM FINANCEIRO.dbo.CRT
DELETE FROM FINANCEIRO.dbo.EMP
DELETE FROM FINANCEIRO.dbo.USR
DELETE FROM FINANCEIRO.dbo.ERR
DELETE FROM FINANCEIRO.dbo.ERR_LOG

INSERT INTO FINANCEIRO.dbo.USR (nome, login, senha, perfil, departamento) VALUES ('Neuci', 'neuci', '03A8A64F9CA460B0EB5466666BFCDD83', 'faturamento', 'fiscal')
INSERT INTO FINANCEIRO.dbo.USR (nome, login, senha, perfil, departamento) VALUES ('Rita', 'rita', '2794D223F90059C9F705C73A99384085', 'financeiro', 'financeiro')
INSERT INTO FINANCEIRO.dbo.USR (nome, login, senha, perfil, departamento) VALUES ('Marisa', 'marisa', '458FF389547C5068DC72CF9B79EBCEBD', 'cobranca', 'cobranca')

INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (0, 'Operação foi realizada com sucesso !')

INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (57010, 'Esta tarefa já foi concluída.')
INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (57015, 'A tarefa não foi encontrada.')

INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (51123, 'Já existe um titulo com o mesmo valor do campo Nosso Numero, Parcela e Carteira.')
INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (51234, 'O campo ''Nosso Numero'' não pode ser zero.')
INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (51235, 'Já existe um lançamento com o mesmo valor do campo ''Nosso Numero''. Para resolver o problema clique no botão ao lado do campo para carregar o próximo número disponível.')
INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (57450, 'Você não pode atualizar esta tarefa porque não esta com as últimas alterações. Abra a tarefa novamente pra ver as alterações, caso tenha feito alguma mudança elas serão perdidas.')
INSERT INTO FINANCEIRO.dbo.ERR (erro, mensagem) VALUES (57451, 'A tarefa que você esta tentando alterar esta desatualizada, você esta vendo uma versão anterior, sem as últimas alterações. Abra a tarefa novamente pra ver as alterações, caso tenha feito alguma mudança elas serão perdidas.')

INSERT INTO FINANCEIRO.dbo.CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRADESCO', '0', '0', 0, 'BRADESCO - GARANTIA', 170, 0, 2.35)
INSERT INTO FINANCEIRO.dbo.CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRADESCO', '0', '0', 0, 'BRADESCO - DESCONTO', 170, 0, 2.35)
INSERT INTO FINANCEIRO.dbo.CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('BRASIL', '0', '0', 0, 'BRASIL - GARANTIA', 250, 3.5, 3.5)
INSERT INTO FINANCEIRO.dbo.CRT (banco, agencia, conta, carteira, nome, valor_operacao, valor_tarifa, taxa_juros) VALUES ('ITAU', '0', '0', 0, 'ITAU - DESCONTO', 340, 3.5, 3.67)

UPDATE GPIMAC_Altamira.dbo.INTEGRACAO_EVENTO SET RECONHECIDO = 0 --WHERE YEAR([timestamp]) >= 2017
