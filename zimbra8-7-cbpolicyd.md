# Zimbra CBPolicyd

## Enable

```bash
zmprov ms `zmhostname` +zimbraServiceEnabled cbpolicyd
```

### Post-fix config

```bash
smtpd_end_of_data_restrictions = check_policy_service inet:localhost:10031
smtpd_recipient_restrictions = check_policy_service inet:localhost:10031, reject_non_fqdn_recipient, permit_sasl_authenticated, permit_mynetworks, reject_unlisted_recipient, reject_invalid_helo_hostname, reject_non_fqdn_sender, permit
smtpd_sender_restrictions = check_policy_service inet:localhost:10031, check_sender_access regexp:/opt/zimbra/common/conf/tag_as_originating.re, permit_mynetworks, permit_sasl_authenticated, permit_tls_clientcerts, check_sender_access regexp:/opt/zimbra/common/conf/tag_as_foreign.re
```

### TCP - Socket

```bash
LISTEN     0      128    127.0.0.1:10031                    *:*                   users:(("cbpolicyd",pid=27359,fd=6),("cbpolicyd",pid=27358,fd=6),("cbpolicyd",pid=27357,fd=6),("cbpolicyd",pid=27356,fd=6),("cbpolicyd",pid=27354,fd=6))
LISTEN     0      128        ::1:10031                   :::*                   users:(("cbpolicyd",pid=27359,fd=5),("cbpolicyd",pid=27358,fd=5),("cbpolicyd",pid=27357,fd=5),("cbpolicyd",pid=27356,fd=5),("cbpolicyd",pid=27354,fd=5))
```

### Log: /opt/zimbra/log/cbpolicyd.log

```text
[2016/11/14-08:56:11 - 27354] [CBPOLICYD] NOTICE: Session tracking is ENABLED.
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: 2016/11/14-08:56:11 cbp (type Net::Server::PreFork) starting! pid(27354)
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: Resolved [localhost]:10031 to [::1]:10031, IPv6
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: Resolved [localhost]:10031 to [127.0.0.1]:10031, IPv4
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: Binding to TCP port 10031 on host ::1 with IPv6
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: Binding to TCP port 10031 on host 127.0.0.1 with IPv4
[2016/11/14-08:56:11 - 27354] [CORE] NOTICE: Setting gid to "994 994"
[2016/11/14-08:56:11 - 27354] [CORE] INFO: Setting up serialization via flock
[2016/11/14-08:56:11 - 27354] [CORE] INFO: Beginning prefork (4 processes)
[2016/11/14-08:56:11 - 27354] [CORE] INFO: Starting "4" children
```

## Disable

```bash
zmprov ms `zmhostname` -zimbraServiceEnabled cbpolicyd
```

## Policyd - WebUI

> Execute os comandos a seguir como usuário root

```bash
cd /opt/zimbra/data/httpd/htdocs/ && ln -s ../../../common/share/webui
```

vi opt/zimbra/common/share/webui/includes/config.php

```bash
$DB_DSN="sqlite:/opt/zimbra/data/cbpolicyd/db/cbpolicyd.sqlitedb";
```

Reinicie o Zimbra

```bash
su - zimbra -c "zmcontrol restart"
su - zimbra -c "zmapachectl restart"
```

Acesso à aplicação

http://zimbra:7780/webui/index.php

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
