## API

- first host this in cloudflare with wrangler and property test.


## Next

- in next application after successfull login from supabase, in cookies auth-token get stored. with this `auth token should be attached to http header` of any api call make to the API worker app. so that the request can be verified authorized or not. it is verified via, JWT_AUTH_TOKEN stored in the API app.  The APP worker just take the header app token and and verify the api token to get the authenticate user.

- Problem: 3 part jwt token error. this is just for not grabing correct cookies in next application.

## Expo

- bun android
- bun dev
Bun dev api should run with --ip 0.0.0.0 so that api exposed to the outside of dev machine(to emmulator).
expo app uses next application for image fetching
and use api for api call.
so fixing appurl and apiurl is really important.
- env

    - 
        ```env
        PUBLIC_API_URL=http://192.168.0.115:8787
        PUBLIC_APP_URL=http://192.168.0.115:3000
        ```

    - this configuration works. as expo run in the same ip as 192.168.0.115
    - for production have to use production url of next and api url from    cloudflare.

- **Another Important thing is to disable firewall in the machine, that block the network request machine to emmulator** [have to test that exactly the situation]

- Emmulator running from another expo project (expo start). this emmulator works for development build and expo go. this way i get that expo app can access machine network.

## EAS BUID

- this need to configure appId
- setting secret from .env.local is very important, without that if i build eas build from my machine, it don't get the .env file as this is ignored in github. so i've to first `eas secret:push` , to push all the .env.local to project level secret.
