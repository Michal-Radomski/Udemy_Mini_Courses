# Manually creating HS256 Signature
echo -n "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIwOTI5ODQsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY5MjEwMTk4NCwidXNlcklkIjoiYWRtaW4iLCJpc0FkbWluIjoidHJ1ZSJ9" | openssl dgst -sha256 -hmac "123456" -binary | openssl base64 -e -A | sed s/\+/-/g | sed 's/\//_/g' | sed -E s/=+$//

# output: eaqTCkhqoHuisYXYS8Egtjdh9slkDxqOURIxHc01fc4

# Generating RSA Keys using OpenSSL -> Not used anywhere!
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -out public.pem -pubout -outform PEM

# output 1:
# -----BEGIN RSA PRIVATE KEY-----
# MIIEowIBAAKCAQEAr6Do7ibHpYXn3ExcVHu+mgzGy06YbhNm6kCrURKcgEUghOv1
# t3/NMePhkF8WlkgTkUCN7DHICd0fPMvV5bBX3Nz0ztz9fFEIDDBYXUwFhQ8ZI3Bo
# Hcmarts2x0hW39tmVp5qL+AF0D7bg26iL05VR3KCvvOPL5NmkQkkomKYaQTZEJM0
# LCBULsqprZ1Z+dgZpF2XosikbqZ5pwl8WgmSCFA7OPhWY2A1CibZwLfhnDPaAlk6
# 5h4BiQRgY+kCgAwWyggpi8nZkzv5wMi2RboHjFKZapZ6zLyCL/THBLGWoRK1yJLt
# nlV7l2cU5JybzmgoOzkIVDKdO4k7yJSeH3g3nQIDAQABAoIBAGF+xO+3jWrgm+ba
# aQLpMtTXtN+VwN6SXLY7sh6uYzx9o2DGkEAObT190HDRqHtChcJDgMWWmQKIwteA
# HDyGmS/dZPUVDo6deQczK0qXchT8Xasjslie2wSoYo9cJAXfCL+a7z2mcfO5gShE
# GTqDlKm18sjH8jup6u0mkzSl4Q+imuI5Q8GO0kFqaDFtpL5+n4cLVRrbLJGmFeyd
# 1mzd+XArGjs/fZ1MD6fNTPuj/udI4QbZoPIUKKsve6D6kzmDPVVTYwtkzb07WGQb
# 6mJmP1ohJcuqrYBkTcRF4joZwjzQcJE7+U7gAI7DjgD5f4aLZZT3JZRpaqrQhd2w
# PX0282ECgYEA1l3Z8OD/cAcqjhjF26R++iZVgnrVuGL3M8dl/DrUjOjrOPDtJe/N
# c2aEGxMwRohslv/ToI33hKaxqK0l5wtE4fFkICAWMRZfGxvNRW0Xoc0p++j1awjR
# w+mxZg/4BFEjTqzs0IcJp3Y2qnntCiLjuJ1p+ZnpNM1xLvvJRjjydAUCgYEA0b0I
# BF+CctIswkQ5YQSNBKD2YmrChWOsWUTHKXCKcyAbxpno8WIwIZWySlA3i8x6RY1O
# 1pKv+n/vjTPLdVPX6Zl3wKuhd65toxx9hhEHUZWGwIA5vAAqghfS5szMkW27BsAj
# /syg1ATJ2B8LogXY44ywygLOb1+jrFqzlFIm4LkCgYB8jovUKuhBb+iKKFrPBQXC
# 1ANbjYQhX1/D9liL9qMKPUxwCY3CPVRjeW3JTZz/XsW592xAHj10FmekWvdrCGE9
# 58UF5Z7/ZsBcQAtGC91vZoa+mN4BE17PNzqc0yqJV5vsWw4/HDe/1jBtXesduKgY
# 3V52abfXtofNhP+ujehTAQKBgE/Sb3CqoMzuLFaq/GNuBfVTBTIji3CUpI083cdp
# q2dxOuD0xnDHe6XsgPRDX0B3S7mYs/55yTu+4P6OTcqTZELlQ2wyZbtUySkguK0D
# YhOsoqI0qsRgE817H6rzGo/mgR1qlshsPHE0eVUlS5oYO5kufEIFm2dLsNDxnBLA
# yUcRAoGBAI0MI6II9afS88WYYz/dC/JGA4hsBnAVO9Th2D0Z31no9nudpljSmCxh
# F4smZA9JTpjO/ka2jMYC+vY3mhWCD+BhcL9qETktLo2ayL+oDBX0iMajcw8oOFph
# hHk0SPepvSfExFmKnw+Ip9FXKIJ6jfQmCveYCQS8CkzZP1OMMbS4
# -----END RSA PRIVATE KEY-----

# output 2:
# -----BEGIN PUBLIC KEY-----
# MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr6Do7ibHpYXn3ExcVHu+
# mgzGy06YbhNm6kCrURKcgEUghOv1t3/NMePhkF8WlkgTkUCN7DHICd0fPMvV5bBX
# 3Nz0ztz9fFEIDDBYXUwFhQ8ZI3BoHcmarts2x0hW39tmVp5qL+AF0D7bg26iL05V
# R3KCvvOPL5NmkQkkomKYaQTZEJM0LCBULsqprZ1Z+dgZpF2XosikbqZ5pwl8WgmS
# CFA7OPhWY2A1CibZwLfhnDPaAlk65h4BiQRgY+kCgAwWyggpi8nZkzv5wMi2RboH
# jFKZapZ6zLyCL/THBLGWoRK1yJLtnlV7l2cU5JybzmgoOzkIVDKdO4k7yJSeH3g3
# nQIDAQAB
# -----END PUBLIC KEY-----

# Mamanually creating RS256 Signature
echo -n "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTIwOTYxNTksImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY5MjEwNTE1OSwidXNlcklkIjoiYWRtaW4iLCJpc0FkbWluIjoidHJ1ZSJ9" | openssl dgst -sha256 -sign private.key | openssl base64 -e -A | sed s/\+/-/g | sed 's/\//_/g' | sed -E s/=+$//

# output
# PYyYPnnP1FzrhMP6iyx3-AY0AUj13sgeubEoMIyflF6Fu1VwDFLB1fDQXfUzoyrJRsoQFEMmnXsxsECrvRaIeDtNLEyA9tKL_L_jkAzwJU6yGerGDK693rx6aaoVA56Iptq0DEjjriXljZ1MVCXI7rs-Wp2QqG8i7pZnqQtiUxNWA2QNz1AVVPm9NKSMzTx353DUoAby5J13Ls322sdfpNveLCGQEKT79l-01c2U1kKttk6gtLiTLm4gLE37hUesK5dqG9PpiVuDLZAcxlntl--LCxEkCDtXLeuEZE2szrraQq8lW7XsLEjfld-jA80MNJ6JAg3C_7nsuWJUKMZ1iA

# Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTIwOTYxNTksImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY5MjEwNTE1OSwidXNlcklkIjoiYWRtaW4iLCJpc0FkbWluIjoidHJ1ZSJ9.PYyYPnnP1FzrhMP6iyx3-AY0AUj13sgeubEoMIyflF6Fu1VwDFLB1fDQXfUzoyrJRsoQFEMmnXsxsECrvRaIeDtNLEyA9tKL_L_jkAzwJU6yGerGDK693rx6aaoVA56Iptq0DEjjriXljZ1MVCXI7rs-Wp2QqG8i7pZnqQtiUxNWA2QNz1AVVPm9NKSMzTx353DUoAby5J13Ls322sdfpNveLCGQEKT79l-01c2U1kKttk6gtLiTLm4gLE37hUesK5dqG9PpiVuDLZAcxlntl--LCxEkCDtXLeuEZE2szrraQq8lW7XsLEjfld-jA80MNJ6JAg3C_7nsuWJUKMZ1iA
