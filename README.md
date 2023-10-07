# THE RAW SQL SOCIAL MEDIA API
## installation
1. clone this repository `git clone https://github.com/Irtiza751/raw-sql-api.git`
2. cd into the raw-sql-api project then run `npm install`
3. After installing all the dependencies run `npm run start:dev` & You should be fully setup now.

## Project Structure
The src directory contains all the source code, & in the src folder the code is organize with the following folders (name & conventions).
1. Modules folder -- (name_module) eg. auth_moudle etc.
2. Controllers folder -- (name.controller.ts) eg. auth.controller.ts
3. Lib folder -- (name.ts)

### TODO
- [x] Create a User repository
- [x] Create a Todo repository
- [x] Create a Tokens repository
- [x] Prevent sending refresh token to the browser
- [x] Create the CRUD controller for todos
- [x] To update the todo alway send `title & description` both
- [x] Implement the auto login on token expiry
- [ ] Add cascasde delete whene user delete a self account
- [ ] Add the user profile image option as well

Refresh token rotation flow
![auth-expire-flow](https://github.com/Irtiza751/raw-sql-api/assets/91867702/85de7d75-aa76-4adb-abd3-ef58c3a8bc22)
