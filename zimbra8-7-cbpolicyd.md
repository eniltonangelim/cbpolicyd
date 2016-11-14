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

## Database



