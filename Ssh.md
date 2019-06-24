

```
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

run 
```
ssh-keygen
```

* id_rsa.pub
public key, please put this file on server.

* id_rsa
private key


copy id_rsa.pub to server
```
ssh USER@HOST 'mkdir -p ~/.ssh;cat >> ~/.ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```

open "puTTygen" window app and import id_rsa, then save as private key file
open "putty" window app, select SSH -> Auth
(v) Attempt TIS or CryptoCard auth (SSH-1)
(v) Attempt "keyboard-interactive" auth (SSH-2)

open Connection -> Data -> Auto-login username = "xxxx"