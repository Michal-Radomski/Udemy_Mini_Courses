echo -n "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIwOTI5ODQsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY5MjEwMTk4NCwidXNlcklkIjoiYWRtaW4iLCJpc0FkbWluIjoidHJ1ZSJ9" | openssl dgst -sha256 -hmac "123456" -binary | openssl base64 -e -A | sed s/\+/-/g | sed 's/\//_/g' | sed -E s/=+$//

# output: eaqTCkhqoHuisYXYS8Egtjdh9slkDxqOURIxHc01fc4
