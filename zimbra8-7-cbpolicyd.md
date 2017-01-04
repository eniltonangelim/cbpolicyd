# Zimbra CBPolicyd

```bash
zmprov ms `zmhostname` zimbraCBPolicydAccountingEnabled TRUE zimbraCBPolicydQuotasEnabled TRUE zimbraCBPolicydAccessControlEnabled TRUE
```

## Quotas CBPolicyd - Ordem de configuração

Primeiramente, são necessários dois passos:

    1. Cria a politica na tabela *policies*
    2. Configure os membros da diretiva recém-criada na tabela policy_members

    a) Se não usarmos os *grupos*, então após configurar a politica e os membros de politica, configuramos as diretivas
    b) Se você configurar os *grupos*, então após configurar as politicas, nós configuramos os *grupos* e então as diretivas

> Prioridade 0, significa que será escolhido primeiro a partir da lista das políticas.

## Laboratório: A cada 5 minutos o usuário pode enviar 10 mensagens

+ Crie o grupo que receberá a diretiva

```sql
INSERT
    INTO
        policy_groups(Name,Disabled)
    VALUES 
        ('limitToSender',0);
```

+ Configure o usuário _foo@bar_ como membro do grupo *_limitToSender_*

```sql
INSERT
    INTO
        policy_group_members(PolicyGroupID,Member,Disabled)
    VALUES
        (6,'foo@bar',0);
```

+ Crie a política _"Limit Sender"_

```sql
INSERT
    INTO
        policies(Name,Priority,Disabled)
    VALUES
        ('Limit Sender',0,0);
```

+ Configure o grupo *_limitToSender_* como membro da política *_Limit Sender_*

```sql
INSERT
    INTO
        policy_members(PolicyID,Source,Destination,Disabled)
    VALUES
        (6,'%limitToSender','any',0);
```

+ Crie a cota para a política *_Limit Sender_*

A configuração abaixo adiará por 5 minutos o envio da mensagem que excedeu o limite da cota.

```sql
INSERT
    INTO
        quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled)
    VALUES
        (6,'Limit Sender Quota','Sender:user@domain',300,'DEFER','User has been deferred for five minutes',0);
```

+ Configure o tipo de restrição para a cota *_Limit Sender_*

Limita o envio de 10 mensagens por 5 minutos.

```sql
INSERT
    INTO
        quotas_limits(QuotasID,Type,CounterLimit,Disabled)
    VALUES
        (6,'MessageCount',10,0);
```

+ Script SQL

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

## Laboratório: A cada 5 minutos a conta foo@bar pode receber 10 mensagens de domínios externos


+ Crie uma coleção para os usuários locais

```sql
INSERT
    INTO
        policy_groups(Name,Disabled)
    VALUES
        ('limitToUserRecipient',0);
```

+ Crie uma coleção para os domínios locais

```sql
INSERT
    INTO
        policy_groups(Name,Disabled)
    VALUES
        ('limitToLocalDomainRecipient',0);
```

+ Configure o usuário _foo@bar_ como membro do grupo *_limitToUserRecipient_*

```sql
INSERT
    INTO
        policy_group_members(PolicyGroupID,Member,Disabled)
    VALUES
        (7,'foo@bar',0);
```

+ Configure o domínio _@bar_ como membro do grupo *_limitToLocalDomainRecipient_*

```sql
INSERT
    INTO
        policy_group_members(PolicyGroupID,Member,Disabled)
    VALUES
        (7,'@bar',0);
```

+ Crie a política _"Limit Recipient"_

```sql
INSERT
    INTO
        policies(Name,Priority,Disabled)
    VALUES
        ('Limit Recipient',0,0);
```

+ Configure os grupos *_limitToUserRecipient_* e *_limitToLocalDomainRecipient_* como membro da política *_Limit Recipient_*

```sql
INSERT
    INTO
        policy_members(PolicyID,Source,Destination,Disabled)
    VALUES
        (7,'%limitToRecipient','!%limitToLocalDomainRecipient',0);
```

> Nota: O simbolo exclamativo possui o mesmo valor lógico da negação, pois, estamos negando a política para a coleção %limitToLocalDomainRecipient.

+ Crie a cota para a política *_Limit Recipient_*

A configuração abaixo adiará por 5 minutos o recebimento da mensagem que excedeu o limite da cota.

```sql
INSERT
    INTO
        quotas(PolicyID,Name,Track,Period,Verdict,Data,Disabled)
    VALUES
        (7,'Limit Recipient Quota','Recipient:user@domain',300,'DEFER','User has been deferred for five minutes',0);
```

+ Configure o tipo de restrição para a cota *_Limit Recipient_*

Limita o envio de 10 mensagens por 5 minutos.

```sql
INSERT
    INTO
        quotas_limits(QuotasID,Type,CounterLimit,Disabled)
    VALUES
        (7,'MessageCount',10,0);
```

+ Script SQL

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

## Laboratório: Rejeita o envio da conta *_foo@bar_* para qualquer domínio externo

+ Crie a política _"Somente envio local"_

```sql
INSERT
    INTO
        policies(Name,Priority,Disabled)
    VALUES
        ('Somente envio local',0,0);
```

+ Configure os grupos *_senderLocalOnlyUser_* e *_limitToLocalDomainRecipient_* como membros da política _"Somente envio local"_

```sql
INSERT
    INTO
        policy_members(PolicyID,Source,Destination)
    VALUES
        (8, '%senderLocalOnlyUser', '!%limitToLocalDomainRecipient');
```

+ Crie uma coleção de usuários para receber a diretiva

```sql
INSERT
    INTO
        policy_groups (Name,Disabled)
    VALUES
        ('senderLocalOnlyUser',0);
```

+ Configure o usuário como membro do grupo *_senderLocalOnlyUser_*

```sql
INSERT
    INTO
        policy_group_members (PolicyGroupID,Member,Disabled)
    VALUES
        (6,'f13@labz.localhost.local',0);
```

+ Configure a diretiva para permitir somente o envio local para o grupo *_senderLocalOnlyUser_*

```sql
INSERT
    INTO
        access_control (ID, PolicyID, Name, Verdict, Data, Comment, Disabled)
    VALUES 
        (1,8,'sender local only', 'REJECT', 'Access Denied', 'Somente envio local', 0);
```

+ Script

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

Nesse caso a política já existe, hipoteticamente, então relaciono à mesma um novo membro.

+ Configure o domínio local como membro da política "Somente envio local"

```sql
INSERT
    INTO
        policy_members (PolicyID,Source,Destination)
    VALUES
        (8, '!@labz.localhost.local', '@labz.localhost.local');
```

+ Script

```sql
BEGIN TRANSACTION;
INSERT INTO "policy_members" (PolicyID,Source,Destination) VALUES(8, '!@labz.localhost.local', '@labz.localhost.local');
COMMIT;
```

## Laboratório: Cada conta está limitada para enviar duas mensagens por hora.

+ Crie a política _GMAIL Outbound Policy_

```sql
INSERT
    INTO
        policies (Name,Priority,Disabled)
    VALUES
        ('GMAIL Outbound Policy',0,0);
```

+ Configure o membro da política _GMAIL Outbound Policy_

```sql
INSERT
    INTO
        policy_members (PolicyID,Source,Destination)
    VALUES
        (10, '@labz.localhost.local', '@gmail.com');
```

+ Configure o limite na coluna _MessageCountLimit_ para a política _GMAIL Outbound Policy_

```sql
INSERT 
    INTO
        accounting (ID,PolicyID,Name,Track,AccountingPeriod,MessageCountLimit,Verdict,Data,LastAccounting,Comment,Disabled)
    VALUES
        (1,10,'GMAIL 2 mensagens por hora', 'Sender:user@domain', 0, 3,'REJECT','Limite de envio para o gmail foi excedido',0,'teste',0);
```

+ Script

```sql
BEGIN TRANSACTION;
INSERT INTO  policies (Name,Priority,Disabled) VALUES ('GMAIL Outbound Policy',0,0);
INSERT INTO  policy_members (PolicyID,Source,Destination) VALUES (10, '@labz.localhost.local', '@gmail.com');
INSERT INTO  accounting (ID,PolicyID,Name,Track,AccountingPeriod,MessageCountLimit,Verdict,Data,LastAccounting,Comment,Disabled) VALUES (1,10,'GMAIL 2 mensagens por hora', 'Sender:user@domain', 0, 3,'REJECT','Limite de envio para o gmail foi excedido',0,'teste',0);
```

> Nota: É possível fazer o bloqueio pelo o total de bytes por hora, semana e mês


## Descrição das colunas de cada Módulo

Coluna: _Verdict_

+ HOLD: Quarentena
+ REJECT: Rejeita a mensagem
+ DISCARD:
+ FILTER:
+ REDIRECT: Redireciona a mensagem para outro endereço de e-mail
+ DEFER:
+ OK:

Coluna: _Data_

Mensagem de retorno para o emissor

Coluna: _Source_

+ NULL = any
+ a.b.c.d/e = IP address with optional /e
+ @domain = domain specification,
+ %xyz = xyz group,
+ abc@domain = abc user specification

Coluna:_Destination_

+ NULL = any
+ a.b.c.d/e = IP address with optional /e
+ @domain = domain specification,
+ %xyz = xyz group,
+ abc@domain = abc user specification

Coluna: _Member_

+ @domain
+ user@domain
+ a.b.c.d/e
+ $sasl_username

Coluna: _Disabled_

+ 0: No
+ 1: Yes

Tabela: Accounting

Coluna: AccountingPeriod

+ 0: Dia
+ 1: Semana
+ 2: Mês