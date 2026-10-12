---
title: TD - Semaine 3
category: Archive
tags: cyber
created: 2026-01-01T23:24:00.000Z
---

# TD - Semaine 3

## Analyse de la mémoire RAM

### Récupération du profil de l'image

Commande : `volatility -f memdump.mem imageinfo`

```
$ vol.py -f memdump.mem imageinfo
Suggested Profile(s) : Win7SP1x86_23418, Win7SP0x86, Win7SP1x86
AS Layer1 : IA32PagedMemoryPae (Kernel AS)
AS Layer2 : FileAddressSpace (/home/rocfor/forensic_case001/memdump.mem)
PAE type : PAE
DTB : 0x185000L
KDBG : 0x82b39c28L
Number of Processors : 1
Image Type (Service Pack) : 1
KPCR for CPU 0 : 0x82b3ac00L
KUSER_SHARED_DATA : 0xffdf0000L
Image date and time : 2019-07-31 13:45:40 UTC+0000
Image local date and time : 2019-07-31 15:45:40 +0200
```

### Récupération la liste des processus

Commande : `volatility -f memdump.mem –-profile=Win7SP1x86 pslist`

```
$ vol.py -f memdump.mem –-profile=Win7SP1x86 pslist
Offset(V)  Name                 PID    PPID   Thds   Hnds     Sess   Wow64  Start                          Exit

---------- -------------------- ------ ------ ------ -------- ------ ------ ------------------------------ ------------------------------

0x848338e8 System                    4 0 90     547      ------ 0 2019-07-31 11:49:59 UTC+0000
0x87002020 smss.exe                272 4 2    29     ------        0 2019-07-31 11:49:59 UTC+0000
0x8673f030 csrss.exe               360 352    9      381 0         0 2019-07-31 11:50:00 UTC+0000
0x867f7030 wininit.exe             412 352    3      74 0          0 2019-07-31 11:50:01 UTC+0000
0x867f55f8 csrss.exe               420 404    11     388 1         0 2019-07-31 11:50:01 UTC+0000
0x86879d40 winlogon.exe            468 404    3      110 1         0 2019-07-31 11:50:01 UTC+0000
0x8684a6c0 services.exe            512 412    8      209 0         0 2019-07-31 11:50:01 UTC+0000
[...]

0x84b5a030 msdtc.exe              1632 512 12 143 0 0 2019-07-31 12:17:50 UTC+0000
0x84b1c030 WINWORD.EXE            3544 588 13 621 1 0 2019-07-31 12:45:34 UTC+0000
0x84e19030 rad5163B.tmp.exe         1416 3544 11 472 1 0 2019-07-31 12:45:47 UTC+0000

[...]

0x84aeebf8 cscript.exe            2728 1416 5 198 1      0 2019-07-31 12:53:57 UTC+0000
0x84f04030 conhost.exe            2876 420 1 33 1      0 2019-07-31 12:53:57 UTC+0000
0x84d165e8 rfhyMVOQxfc.exe         1292 2728 0 -------- 1      0 2019-07-31 12:53:57 UTC+0000 2019-07-31 13:45:12 UTC+0000
0x84ad3a08 cmd.exe                2204 1416 0 -------- 1      0 2019-07-31 12:55:36 UTC+0000 2019-07-31 12:58:21 UTC+0000
0x84e6fa90 cmd.exe                1896 1416 0 -------- 1      0 2019-07-31 13:00:28 UTC+0000 2019-07-31 13:01:09 UTC+0000

[...]

0x84a835a8 whoami.exe             2100 3992 0 -------- 1      0 2019-07-31 13:40:09 UTC+0000 2019-07-31 13:40:09 UTC+0000
0x86e1dcd0 whoami.exe             3972 2772 0 -------- 1      0 2019-07-31 13:40:10 UTC+0000 2019-07-31 13:40:10 UTC+0000
0x84dc3d40 rfhyMVOQxfc.exe         1808 2728 3 91 1      0 2019-07-31 13:45:17 UTC+0000
```

### Liste des DLL d'un processus

Commande : `volatility -f memdump.mem –-profile=Win7SP1x86 dlllist -p 1808`

```
$ vol.py-f memdump.mem –-profile=Win7SP1x86 dlllist  -p 1808
************************************************************************
rfhyMVOQxfc.ex pid:   1808
Command line : "C:\Users\johnoc\AppData\Local\Temp\rad41020.tmp\rfhyMVOQxfc.exe"
Service Pack 1

Base             Size LoadCount LoadTime                       Path
---------- ---------- ---------- ------------------------------ ----
0x00400000    0x16000 0xffff 1970-01-01 00:00:00 UTC+0000   C:\Users\johnoc\AppData\Local\Temp\rad41020.tmp\rfhyMVOQxfc.exe
0x777d0000   0x13c000 0xffff 1970-01-01 00:00:00 UTC+0000   C:\Windows\SYSTEM32\ntdll.dll
0x773f0000    0xd4000 0xffff 2019-07-31 13:45:17 UTC+0000   C:\Windows\system32\kernel32.dll
0x75ac0000    0x4a000 0xffff 2019-07-31 13:45:17 UTC+0000   C:\Windows\system32\KERNELBASE.dll

[...]

0x72160000     0xd000 0x1 2019-07-31 13:45:18 UTC+0000   C:\Windows\system32\dhcpcsvc6.DLL
0x72140000    0x12000 0x1 2019-07-31 13:45:18 UTC+0000   C:\Windows\system32\dhcpcsvc.DLL
```

### Analyse du registre

Commande : `volatility -f memdump.mem –-profile=Win7SP1x86 hivelist`

```
$ vol.py -f memdump.mem –-profile=Win7SP1x86 hivelist
Virtual    Physical Name
---------- ---------- ----
0x95281008 0x675df008 \??\C:\Users\johnoc\AppData\Local\Microsoft\Windows\UsrClass.dat
0x95289008 0x6c12a008 \??\C:\Users\johnoc\ntuser.dat

[...]

0x8f091900 0x006a5900 \Device\HarddiskVolume1\Boot\BCD
0x8f100098 0x0734d098 \SystemRoot\System32\Config\SOFTWARE
```

### Analyse des connexions réseaux

Commande : `volatility -f memdump.mem --profile=Win7SP1x86 hashdump -y 0x8981c008 -s 0x8a6579c8`

```
$ vol.py -f memdump.mem --profile=Win7SP1x86 hashdump -y 0x8981c008 -s 0x8a6579c8

Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
johnoc:1000:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::
```

## Analyse du disque

### Extraction de la MFT pour l'analyser