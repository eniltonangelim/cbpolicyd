# Zimbra Collaboration Postscreen

O _Postscreen_ é um recurso adicional para a estratégia de _Anti-SPAM_, previnindo que o servidor de email fique sobrecarregado. O processo _Postscreen_ controla múltiplas conexões _inbound SMTP_, e decide quais clientes trocaram mensagens com o processo SMTP do _Post-fix_. O Postscreen não deve ser usado na porta SMTP que recebe mensagens dos usuários finais (MUAs). 

+ Postscreen: Porta 25
+ MUA: Porta 587
+ Site¹: Configurar um servidor dedicado non-postscreen

O Postscreen trabalha com uma _white-list_ temporária para os clientes que passaram em vários testes.

## Caso de uso: Sem postscreen

O registro abaixo é uma evidencia de que o servidor está sobrecarrregado, assim como existe a possibilidade do Zimbra está sendo alvo de _bot_. Sem o _Postscreen_ todas as conexões são fechadas diretamente com o _Post-fix SMTP_.

![without][withoutpostscreen]

[withoutpostscreen]: https://wiki.zimbra.com/images/thumb/a/a0/Postscreen-001.png/800px-Postscreen-001.png

```text
Mar 01 19:29:54 zimbrauk postfix/smtpd[24266]: timeout after RCPT from mail.example.com[60.60.60.70]
```

## Caso de uso: Com postscreen

As conexões _inbound SMTP_ são gerenciadas pelo _Postscreen_, impedindo que a comunicação seja fechada diretamente com o _Post-fix SMTP_, atrasando a sobrecarga do servidor _smtpd_. Por padrão todos os _bot_ e _zumbis_.

![with][withpostscreen]

[withpostscreen]: https://wiki.zimbra.com/images/thumb/b/b2/Postscreen-002.png/800px-Postscreen-002.png

## Workflow do Postscreen

![Workflow][flow]

Fonte: _wiki.zimbra.com_

[flow]: https://wiki.zimbra.com/images/thumb/3/33/Postscreen-003.png/800px-Postscreen-003.png

## Atributos para Postscreen

> Note a diferença entre os valores: ignore, enforce e drop.

+ **ignore (default)**: Ignora o resultado. Permitir que os outros testes sejam concluídos. Repita este teste na próxima vez que o cliente se conectar. Esta opção é útil para testes e para coleta de estatísticas sem bloquear o email.
+ **enforce**: Permitir que os outros testes sejam concluídos. Rejeita as tentativas para a entrega da mensagens, respondendo com o código SMTP 550, e regista as informações _helo_/_sender_/_recipient_.
+ **drop**: Cancela a conexão imediatamente, respondendo com o código SMTP 521.

Todos os novos atributos para o _Postscreen_ podem ser encontrados [aqui][0].

[0]: http://www.postfix.org/postconf.5.html#postscreen_access_list

Sintaxe para o nome do atributo:

```text
Post-fix: postscreen_non_smtp_command_ttl
Zimbra: zimbraMtaPostscrenNonSmtpCommandTTL

Post-fix: postscreen_non_smtp_command_action
Zimbra: zimbraMtaPostscreenNonSmtpCommandAction
```

## Como habilitá-lo

É habilitado por padrão na versão 8.7 ou superior.

## Exemplo de configuração

> A configuração abaixo é nível médio/alto, reforçando alguns atributos para _drop_.

```bash
zmprov mcf zimbraMtaPostscreenAccessList permit_mynetworks
zmprov mcf zimbraMtaPostscreenBareNewlineAction ignore
zmprov mcf zimbraMtaPostscreenBareNewlineEnable no
zmprov mcf zimbraMtaPostscreenBareNewlineTTL 30d
zmprov mcf zimbraMtaPostscreenBlacklistAction ignore
zmprov mcf zimbraMtaPostscreenCacheCleanupInterval 12h
zmprov mcf zimbraMtaPostscreenCacheRetentionTime 7d
zmprov mcf zimbraMtaPostscreenCommandCountLimit 20
zmprov mcf zimbraMtaPostscreenDnsblAction enforce
zmprov mcf zimbraMtaPostscreenDnsblSites 'b.barracudacentral.org=127.0.0.2*7'
  zimbraMtaPostscreenDnsblSites 'dnsbl.inps.de=127.0.0.2*7'
  zimbraMtaPostscreenDnsblSites 'zen.spamhaus.org=127.0.0.[10;11]*8'
  zimbraMtaPostscreenDnsblSites 'zen.spamhaus.org=127.0.0.[4..7]*6'
  zimbraMtaPostscreenDnsblSites 'zen.spamhaus.org=127.0.0.3*4'
  zimbraMtaPostscreenDnsblSites 'zen.spamhaus.org=127.0.0.2*3'
  zimbraMtaPostscreenDnsblSites 'list.dnswl.org=127.0.[0..255].0*-2'
  zimbraMtaPostscreenDnsblSites 'list.dnswl.org=127.0.[0..255].1*-3'
  zimbraMtaPostscreenDnsblSites 'list.dnswl.org=127.0.[0..255].2*-4'
  zimbraMtaPostscreenDnsblSites 'list.dnswl.org=127.0.[0..255].3*-5'
  zimbraMtaPostscreenDnsblSites 'bl.mailspike.net=127.0.0.2*5'
  zimbraMtaPostscreenDnsblSites 'bl.mailspike.net=127.0.0.[10;11;12]*4'
  zimbraMtaPostscreenDnsblSites 'wl.mailspike.net=127.0.0.[18;19;20]*-2'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.10*8'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.5*6'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.7*3'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.8*2'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.6*2'
  zimbraMtaPostscreenDnsblSites 'dnsbl.sorbs.net=127.0.0.9*2'
zmprov mcf zimbraMtaPostscreenDnsblTTL 5m
zmprov mcf zimbraMtaPostscreenDnsblThreshold 8
zmprov mcf zimbraMtaPostscreenDnsblTimeout 10s
zmprov mcf zimbraMtaPostscreenDnsblWhitelistThreshold 0
zmprov mcf zimbraMtaPostscreenGreetAction enforce
zmprov mcf zimbraMtaPostscreenGreetTTL 1d
zmprov mcf zimbraMtaPostscreenNonSmtpCommandAction drop
zmprov mcf zimbraMtaPostscreenNonSmtpCommandEnable no
zmprov mcf zimbraMtaPostscreenNonSmtpCommandTTL 30d
zmprov mcf zimbraMtaPostscreenPipeliningAction enforce
zmprov mcf zimbraMtaPostscreenPipeliningEnable no
zmprov mcf zimbraMtaPostscreenPipeliningTTL 30d
zmprov mcf zimbraMtaPostscreenWatchdogTimeout 10s
zmprov mcf zimbraMtaPostscreenWhitelistInterfaces static:all
```

## Exemplo de log do Postscreen

```text
Mar  1 02:03:26 edge01 postfix/postscreen[23154]: DNSBL rank 28 for [112.90.37.251]:20438 
Mar  1 02:03:26 edge01 postfix/postscreen[23154]: CONNECT from [10.210.0.161]:58010 to [10.210.0.174]:25 
Mar  1 02:03:26 edge01 postfix/postscreen[23154]: WHITELISTED [10.210.0.161]:58010 
Mar  1 02:03:27 edge01 postfix/postscreen[23154]: NOQUEUE: reject: RCPT from [112.90.37.251]:20438: 550 5.7.1 Service unavailable; client [112.90.37.251] blocked using zen.spamhaus.org; from=<hfxdgdsggfvfg@gmail.com>, to=<support@zimbra.com>, proto=ESMTP, helo=<gmail.com>
Mar  1 02:03:27 edge01 postfix/postscreen[23154]: DISCONNECT [112.90.37.251]:20438
```

## Lista _whitelist_ e _blacklist_: Permanente

Passos:

 + Crie o arquivo _/opt/zimbra/conf/postfix/postscreen_wblist_
 + Adicione as entradas no format CIDR:

```text
# Rules are evaluated in the order as specified.
# Blacklist 60.70.80.* except  60.70.80.91.
60.70.80.91/32 permit
60.70.80.0/24 reject
70.70.70.0/24 reject
```

 + Configure o postscreen

```text
zmprov mcf zimbraMtaPostscreenAccessList "permit_mynetworks, cidr:/opt/zimbra/conf/postfix/postscreen_wblist"
zmprov mcf zimbraMtaPostscreenBlacklistAction enforce
```

 + Aguarde pelo zmcongid para atualizar a configuração (60 segundos)
 + Após 60 segundos, ou um restart manual do MTA, você verá algo parecido com o log:

```text
Jun 29 05:16:22 edge04e postfix/postscreen[7546]: BLACKLISTED [70.70.70.100]:55699
```

## Lista _whitelist_ e _blacklist_: Temporária

O _postscreen_ daemon mantém uma whitelist temporária para os clientes SMTP que passaram em todos os testes.

+ O parâmetro *_postscreen_cache_map_* especifica a localização da lista temporária

+ Por padrão a _whitelist_ temporária não é compartilhada com outros _postscreen_ daemon.

## Testes antes do _220 SMTP_

> A ação _postscreen_blacklist_action_ faz parte da configuração da lista white/blacklist.

### MX Policy

```text
CONNECT from [address]:port to [168.100.189.8]:25 WHITELIST VETO [address]:port
```

Tradução: the client at [address]:port connected to the backup MX address 168.100.189.8 while it was not whitelisted. The client will not be granted the temporary whitelist status, even if passes all the whitelist tests described below.

### Pregreet test - Tests before the 220 SMTP server greeting

Atributos:

+ postscreen_greet_wait
+ postscreen_greet_banner
+ postscreen_access_list

Lógica:

Ação:  postscreen_greet_action = ignore (padrão)

Log:

```text
PREGREET count after time from [address]:port text...
```

Tradução: the client at [address]:port sent count bytes before its turn to speak. This happened time seconds after the postscreen_greet_wait timer was started. The text is what the client sent (truncated to 100 bytes, and with non-printable characters replaced with C-style escapes such as \r for carriage-return and \n for newline).

### DNS White/blacklist test - Tests before the 220 SMTP server greeting

> Desabilitado por padrão

> Cuidado: Quando o _postscreen_ rejeita um email, a respota do SMTP contém o _DNSBL domain name_. Use o recurso _postscreen_dnsbl_reply_map_ para esconder a informação.

Atributos:

+ postscreen_dnsbl_sites
+ postscreen_greet_wait
+ postscreen_dnsbl_reply_map
+ postscreen_dnsbl_threshold
+ postscreen_dnsbl_action

Lógica: if _DNSBL Score_ is equal to or greater than the _DNSBL Threshold_

Ação: postscreen_dnsbl_action = ignore (padrão)

Log:

```text
DNSBL rank count for [address]:port
```

Tradução: the SMTP client at _[address]:port_ has a combined DNSBL score of **count**.

## Testes depois do _220 SMTP_

Esses testes usam o protocolo SMTP

> Os testes neste nível são desabilitados por padrão. Estes testes são mais intrusivos do que os testes *_pregreet_* e *_DNSBL_*

Como o _postscreen_ não é um proxy, precisamos conhecer as limitações dos testes nesse nível.

+ A principal limitação do "_after 220 greeting_" é que se um cliente precisar disconectar após passar nos testes. Então o cliente precisará reconectar com o mesmo endereço IP antes de entregar a mensagem. As seguintes medidas podem ajudá-lo a evitar atrasos de email:
    + Permitir os "bons" clientes para pular os testes especificando o _postscreen_dnsbl_whitelist_threshold_. Isto é especialmente efetivo para ISP como Google que numca tenta imediatamente reenviar a mensagem com o mesmo IP.
    + Small sites: Configure o _postscreen_ para escutar em múltiplos endereços IP, publicados no DNS como endereços de IP diferentes para o mesmo _MX hostname_ ou para diferentes _MX hostnames_.
    + Large sites: Compartilhe o cache do _postscreen_ entre os diferentes MTAs. Novamente, isso evitará os atrasos no recebimento das mensagens.
+ O _postscreen_ não implementa os verbos AUTH, XCLIENT, e XFORWARD. Se você precisa ter esses serviços disponível na porta 25, então não habilite os testes deste nível.
+ Os MUAs devem se conectar diretamente ao serviço _Submission_, para que eles nunca sejam testados pelo _postscreen_.

### Command pipelining

> Detecta zumbies que enviam múltiplos comandos, ao invés de enviar um comando e aguardar pela resposta do servidor

Atributos:

+ postscreen_pipelining_enable

Lógica: If client sends multiple Commands

Ação:  postscreen_pipelining_action = enforce (padrão)

Log:

```text
COMMAND PIPELINING from [address]:port after command: text
```

Tradução: the SMTP client at _[address]:port_ sent multiple SMTP commands, instead of sending one command and then waiting for the server to reply.


### Non-SMTP

> Alguns spambots enviam as mensagens através de _proxies_ abertos. Um sintoma disso é o uso de comandos como os CONNECT e outros que não são comandos do protocolo SMTP.

Atributos:

+ postscreen_non_smtp_command_enable

Lógica: If a client send non-SMTP Commands

Ação: postscreen_non_smtp_command_action = drop

Log:

```text
NON-SMTP COMMAND from [address]:port after command: text
```

Tradução: the SMTP client at [address]:port sent a command that matches the postscreen_forbidden_commands parameter, or that has the syntax of a message header label (text followed by optional space and ":").

### Bare newline

> O SMTP é um protocolo orientado a "linha": as linhas tem um tamanho limitado, e são terminadas com <CR><LF>. Linhas terminadas em "bare"<LF>, ou seja, a linha não é precedida por um _carriage return_, não são permitidas no SMTP.

Atributos:

+ postscreen_bare_newline_enable

Lógica: If a client sends bare newline characters

Ação:  postscreen_bare_newline_action = ignore (padrão)

Log:

```text
BARE NEWLINE from [address]:port after command
```

Tradução: the SMTP client at [address]:port sent a bare newline character, that is newline not preceded by carriage return

## Outras mensagens

```text
HANGUP after time from [address]:port in test name
```

Tradução: the SMTP client at _[address]:port_ disconnected unexpectedly, time seconds after the start of the test named **_test name_**.

```text
COMMAND TIME LIMIT from [address]:port after command
```

Tradução: the SMTP client at _[address]:port_ reached the per-command time limit as specified with the postscreen_command_time_limit parameter.

```text
COMMAND COUNT LIMIT from [address]:port after command
```

Tradução: the SMTP client at _[address]:port_ reached the per-session command count limit as specified with the postscreen_command_count_limit parameter.

```text
COMMAND LENGTH LIMIT from [address]:port after command
```

Tradução: the SMTP client at [address]:port reached the per-command length limit, as specified with the line_length_limit parameter. 

```text
NOQUEUE: reject: CONNECT from [address]:port: too many connections
NOQUEUE: reject: CONNECT from [address]:port: all server ports busy
```

Tradução: too many connections

```text
PASS NEW [address]:port
```

Tradução: SMTP client passes all tests

## Configurando manualmente o serviço Postscreen


+ Turning on postscreen(8) without blocking mail: [aqui][enable]
+ postscreen(8) TLS configuration: [aqui][starttls]
+ Blocking mail with postscreen(8): [aqui][blocking]
+ Turning off postscreen(8): [aqui][turnoff]
+ Sharing the temporary whitelist: [aqui][temp_white_sharing]

[enable]: http://www.postfix.org/POSTSCREEN_README.html#enable
[starttls]: http://www.postfix.org/POSTSCREEN_README.html#starttls
[blocking]: http://www.postfix.org/POSTSCREEN_README.html#blocking
[turnoff]:http://www.postfix.org/POSTSCREEN_README.html#turnoff
[temp_white_sharing]: http://www.postfix.org/POSTSCREEN_README.html#temp_white_sharing

## Notas

> Em produção é comum configurar o _postscreen_ para rejeitar mensagens de clientes que falharam uma ou mais vezes, após o registro do helo, sender e informações do destinatário.

> O _postscreen_ não é um SMTP proxy; isto é intecional. O propósito é manter os bot e zumbis longe do _Post-fix SMTP_.

> Antes de iniciar os testes. Postscreen consulta as listas whitelist e blacklist local para agilizar a fila para os clientes conhecidos.
>+ Permanente white/blacklist
>+ Temporária white/blacklist
>+ MX Policy

## Documentação complementar

+ [rob0.nodns4.us][rob0]

[rob0]: http://rob0.nodns4.us/postscreen.html

## Fonte

+ [wiki.zimbra.com][wikiZimbra]
+ [www.postfix.org][postfix]

[wikiZimbra]: https://wiki.zimbra.com
[postfix]: http://www.postfix.org


## Dicionário

1: http://dictionary.cambridge.org/us/dictionary/english-portuguese/site

an area that is used for something or where something happens: 

+ local
+ lugar
+ sítio
+ terreno