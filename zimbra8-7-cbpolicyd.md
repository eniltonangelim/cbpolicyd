# Zimbra CBPolicyd

## Quotas CBPolicyd - Ordem de configuração

Primeiramente, são necessários dois passos:

    1. Cria a politica na tabela *policies*
    2. Configure os membros da diretiva recém-criada na tabela policy_members

    a) Se não usarmos os *grupos*, então após configurar a politica e os membros de politica, nós editamos a tabela *quota* e *quota_limits*
    b) Se você configurar os *grupos*, então após configurar as politicas, nós configuramos os *grupos* e então as *quotas*

Tipos de dados:

```typescript
yes:Boolean = 1;
no:Boolean = 0;
```

+ Criando uma politica

> Prioridade 0, significa que será escolhido primeiro a partir da lista das políticas.

```sql
insert into policies(Name,Priority,Disabled) VALUES ('test_policy',0,0);
```

+ Criando os membros da politica

> A coluna *PolicyID* da tabela *policy_members* aponta para o ID da tabela *policies*

Com *grupo*

> A coluna *Source* não aceita dois grupos, ou seja, crie um novo registro para cada grupo

```sql
insert into policy_members(PolicyID,Source,Destination,Disabled) VALUES (1,'%test_group','any',0);
```

Sem *grupo*

```sql
insert into policy_members(PolicyID,Source,Destination,Disabled) VALUES (1,'user@mydomain.com','any',0);
```

Valores aceitos na coluna *Source* e *Destination*

```text
Format of key:
NULL = any
a.b.c.d/e = IP address with optional /e
@domain = domain specification,
%xyz = xyz group,
abc@domain = abc user specification

all options support negation using !<key>
```


+ Adicionando o grupo

1. Grupo *test_group*

```sql
insert into policy_groups(Name,Disabled) VALUES ('test_group',0);
```

2. Cria os membros para o grupo *test_grupos*

> Formato de entrada da coluna *Member*: a.b.c.d/e = ip,  @domain = domain, %xyz = xyz group, abc@domain = abc user

```sql
insert into policy_group_members(PolicyGroupID,Member,Disabled) VALUES (1,'testuser@mydomain',0);
insert into policy_group_members(PolicyGroupID,Member,Disabled) VALUES (1,'192.168.56.10/24',0);
```

"O exemplo acima mostra que todas as cotas, apontando para a política ID 1, estarão forçando suas regras em testuser@mydomain, máquina com ip 192.168.56.10 e user@mydomain.com, especificada como ID 2 na tabela policy_members. Além disso, como no exemplo anterior, o PolicyGroupID está apontando para um ID de entrada de policy_groups específico. No nosso caso está apontando para ID 1."

Fonte: wiki.zimbra.com

+ Configurando a *quota*

Formato de entrada para a coluna *Track*

```text
SenderIP: /24
Sender & Recipient: ou user@domain ou user@ ou @domain
```

1. Cria a *quota*

```sql
insert into quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled) VALUES (1,'test_quota','Sender:user@domain',120,'DEFER','User has been deferred for two minutes',0);
```

2. Cria a restrição

```sql
insert into quotas_limits(QuotasID,Type,CounterLimit,Disabled) VALUES (1,'MessageCount',2,0);
```

Tipo de restrição

    1. MessageCount
    2. MessageCumulativeSize


"Os comandos acima estão impondo uma quota que está restringindo todos os usuários em% test_group e user@mydomain.com para não enviar mais de duas mensagens em um intervalo de tempo de dois minutos. Observe que a cota está apontando para uma diretiva específica. Temos apenas uma política, portanto, ela aponta para a diretiva ID 1. A tabela quota_limits tem uma entrada que está apontando para a cota da tabela de cota. Em vez de "Sender", podemos especificar "Destinatário", que irá limitar os e-mails recebidos pelo usuário / grupo."

Fonte: wiki.zimbra.com


### Exemplo

+ Rate limit any sender from sending more then 20 emails every 60 seconds.  Messages beyond this limit are deferred.

+ Rate limit any @domain from receiving more then 50 emails in a 60 second period.  Messages beyond this rate are rejected.

sqlite3 /opt/zimbra/data/cbpolicyd/db/cbpolicyd.sqlitedb  <access_control.sql

```sql
BEGIN TRANSACTION;
INSERT INTO "policies" VALUES(6, 'Zimbra', 0, 'Zimbra QA Test Policy', 0);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('policies', 6);
INSERT INTO "sqlite_sequence" VALUES('policy_members', 6);
INSERT INTO "sqlite_sequence" VALUES('policy_groups', 2);
INSERT INTO "sqlite_sequence" VALUES('policy_group_members', 3);
INSERT INTO "sqlite_sequence" VALUES('quotas', 4);
INSERT INTO "sqlite_sequence" VALUES('quotas_limits', 5);
INSERT INTO "sqlite_sequence" VALUES('checkhelo_blacklist', 4);
INSERT INTO "policy_members" VALUES(6, 6, 'any', 'any', , 0);
INSERT INTO "quotas" VALUES(3, 6, 'Sender:user@domain','Sender:user@domain', 60, 'DEFER', 'Deferring: Too many messages from sender in last 60', , 0);
INSERT INTO "quotas" VALUES(4, 6, 'Recipient:@domain', 'Recipient:@domain', 60, 'REJECT', , , 0);
INSERT INTO "quotas_limits" VALUES(4, 3, 'MessageCount', 20, , 0);
INSERT INTO "quotas_limits" VALUES(5, 4, 'MessageCount', 50, , 0);
COMMIT;
```

## Access Control CBPolicyd - Ordem de configuração

Na teoria a configuração para restringir o envio local de email para uma lista de contas estar descrita logo abaixo, contudo não funcionou no nosso servidor de email.

## Módulo access_control

```text
zmlocalconfig -e cbpolicyd_module_accesscontrol=1
zmlocalconfig -e postfix_enable_smtpd_policyd=yes
zmlocalconfig -e cbpolicyd_log_level=4
zmlocalconfig -e cbpolicyd_module_accesscontrol=1 cbpolicyd_module_quotas=1
```

+ Zimbra 8.0.x

```text
su – zimbra
zmprov ms `zmhostname` +zimbraServiceInstalled cbpolicyd +zimbraServiceEnabled cbpolicyd
zmlocalconfig -e postfix_enable_smtpd_policyd=yes
zmprov mcf +zimbraMtaRestriction “check_policy_service inet:127.0.0.1:10031”
```

+ Zimbra 8.5.x

```text
su - zimbra
zmprov ms `zmhostname` zimbraCBPolicydAccessControlEnabled TRUE
```

```text
zmmtactl stop
zmmtactl start
zmcbpolicydctl restart
```

### CBPolicyd - Configuração

sqlite3 /opt/zimbra/data/cbpolicyd/db/cbpolicyd.sqlitedb  <access_control.sql

+ _access_control.sql_

```sql
BEGIN TRANSACTION;
INSERT INTO "policies" (ID,Name,Priority,Description) VALUES (6, 'homologa', 0, 'Teste: Somente envio local');
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(6, '%local_user', '!%local_domain');
INSERT INTO "policy_groups"  (ID,Name,Disabled,Comment)  VALUES (3, 'local_user', 0, 'Lista de contas');
INSERT INTO "policy_groups"  (ID,Name,Disabled,Comment)  VALUES (4, 'local_domain', 0, 'Teste: Lista de domínio');
INSERT INTO "policy_group_members" (ID, PolicyGroupID, Member, Disabled, Comment) VALUES (4, 3, 'f13@labz.localhost.local',0,'Somente envio local');
INSERT INTO "policy_group_members" (ID, PolicyGroupID, Member, Disabled, Comment) VALUES (5, 4, '@labz.localhost.local', 0, 'Somente envio local');
INSERT INTO "access_control" (ID, PolicyID, Name, Verdict, Data, Comment, Disabled)  VALUES (1,6,'homologa_acl', 'REJECT', 'Access Denied', 'Somente envio local', 0);
COMMIT;
```


## Laboratório: Limite de envio para o usuario foo@bar

1. Crie o grupo que receberá a diretiva

```sql
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToSender',0);
```

2. Configure o usuário _foo@bar_ como membro do grupo *_limitToSender_*

```sql
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (6,'foo@bar',0);
```

3. Crie a política _"Limit Sender"_

```sql
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Limit Sender',0,0);
```

4. Configure o grupo *_limitToSender_* como membro da política *_Limit Sender_*

```sql
INSERT INTO policy_members(PolicyID,Source,Destination,Disabled) VALUES (6,'%limitToSender','any',0);
```

5. Crie a cota para a política *_Limit Sender_*

A configuração abaixo adiará por 5 minutos o envio da mensagem que excedeu o limite da cota.

```sql
INSERT INTO quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled) VALUES (6,'Limit Sender Quota','Sender:user@domain',300,'DEFER','User has been deferred for five minutes',0);
```

6. Configure o tipo de restrição para a cota *_Limit Sender_*

Limita o envio de 10 mensagens por 5 minutos.

```sql
INSERT INTO quotas_limits(QuotasID,Type,CounterLimit,Disabled) VALUES (6,'MessageCount',10,0);
```

7. Script SQL

```sql
BEGIN TRANSACTION
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToSender',0);
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (3,'foo@bar',0);
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Limit Sender',0,0);
INSERT INTO policy_members(PolicyID,Source,Destination,Disabled) VALUES (6,'%limitToSender','any',0);
INSERT INTO quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled) VALUES (6,'Limit Sender Quota','Sender:user@domain',300,'DEFER','User has been deferred for five minutes',0);
INSERT INTO quotas_limits(QuotasID,Type,CounterLimit,Disabled) VALUES (3,'MessageCount',10,0);
COMMIT;
```

## Laboratório: Limitar o recebimento de email externo para a conta foo@bar


1. Crie uma coleção para os usuários locais

```sql
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToUserRecipient',0);
```

2. Crie uma coleção para os domínios locais

```sql
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToLocalDomainRecipient',0);
```

3. Configure o usuário _foo@bar_ como membro do grupo *_limitToUserRecipient_*

```sql
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (7,'foo@bar',0);
```

4. Configure o domínio _@bar_ como membro do grupo *_limitToLocalDomainRecipient_*

```sql
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (7,'@bar',0);
```

5. Crie a política _"Limit Recipient"_

```sql
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Limit Recipient',0,0);
```

6. Configure os grupos *_limitToUserRecipient_* e *_limitToLocalDomainRecipient_* como membro da política *_Limit Recipient_*

```sql
INSERT INTO policy_members(PolicyID,Source,Destination,Disabled) VALUES (7,'%limitToRecipient','!%limitToLocalDomainRecipient',0);
```

> Nota: O simbolo exclamativo possui o mesmo valor lógico da negação, pois, estamos negando a política para a coleção %limitToLocalDomainRecipient.

7. Crie a cota para a política *_Limit Recipient_*

A configuração abaixo adiará por 5 minutos o recebimento da mensagem que excedeu o limite da cota.

```sql
INSERT INTO quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled) VALUES (7,'Limit Recipient Quota','Recipient:user@domain',300,'DEFER','User has been deferred for five minutes',0);
```

8. Configure o tipo de restrição para a cota *_Limit Recipient_*

Limita o envio de 10 mensagens por 5 minutos.

```sql
INSERT INTO quotas_limits(QuotasID,Type,CounterLimit,Disabled) VALUES (7,'MessageCount',10,0);
```

9. Script SQL

```sql
BEGIN TRANSACTION
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToUserRecipient',0);
INSERT INTO policy_groups(Name,Disabled) VALUES ('limitToLocalDomainRecipient',0);
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (4,'f13@labz.localhost.local',0);
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (5,'@labz.localhost.local',0);
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Limit Recipient',0,0);
INSERT INTO policy_members(PolicyID,Source,Destination,Disabled) VALUES (7,'%limitToRecipient','!%limitToLocalDomainRecipient',0);
INSERT INTO quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled) VALUES (7,'Limit Recipient Quota','Recipient:user@domain',300,'DEFER','User has been deferred for five minutes',0);
INSERT INTO quotas_limits(QuotasID,Type,CounterLimit,Disabled) VALUES (4,'MessageCount',10,0);
COMMIT;
```

## Laboratório: Rejeitar o envio de email da conta *_foo@bar_* para qualquer domínio externo

1. Crie a política _"Somente envio local"_

```sql
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Somente envio local',0,0);
```

2. Configure os grupos *_senderLocalOnlyUser_* e *_limitToLocalDomainRecipient_* como membros da política _"Somente envio local"_

```sql
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(8, '%senderLocalOnlyUser', '!%limitToLocalDomainRecipient');
```

3. Crie uma coleção de usuários para receber a diretiva

```sql
INSERT INTO policy_groups(Name,Disabled) VALUES ('senderLocalOnlyUser',0);
```

4. Configure o usuário como membro do grupo *_senderLocalOnlyUser_*

```sql
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (6,'f13@labz.localhost.local',0);
```

5. Configure a diretiva para permitir somente o envio local para o grupo *_senderLocalOnlyUser_*

```sql
INSERT INTO "access_control" (ID, PolicyID, Name, Verdict, Data, Comment, Disabled)  VALUES (1,8,'sender local only', 'REJECT', 'Access Denied', 'Somente envio local', 0);
```

6. Script

```sql
BEGIN TRANSACTION;
INSERT INTO policies(Name,Priority,Disabled) VALUES ('Somente envio local',0,0);
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(8, '%senderLocalOnlyUser', '!%limitToLocalDomainRecipient');
INSERT INTO policy_groups(Name,Disabled) VALUES ('senderLocalOnlyUser',0);
INSERT INTO policy_group_members(PolicyGroupID,Member,Disabled) VALUES (6,'f13@labz.localhost.local',0);
INSERT INTO "access_control" (ID, PolicyID, Name, Verdict, Data, Comment, Disabled)  VALUES (1,8,'sender local only', 'REJECT', 'Access Denied', 'Somente envio local', 0);
COMMIT;
```

## Laboratório: Restrição para recebimento de email para um domínio local


1. Configure o domínio local como membro da política "Somente envio local"

```sql
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(9, '!@labz.localhost.local', '@labz.localhost.local');
```

2. Script

```sql
BEGIN TRANSACTION;
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(8, '!@labz.localhost.local', '@labz.localhost.local');
COMMIT;
```


## Descrição das colunas de cada Módulo

Coluna _Verdict_

+ HOLD: Quarentena
+ REJECT: Rejeita a mensagem
+ DISCARD: 
+ FILTER:
+ REDIRECT: Redireciona a mensagem para outro endereço de e-mail
+ OK: 

Coluna: _Data_

Mensagem de retorno para o emissor
