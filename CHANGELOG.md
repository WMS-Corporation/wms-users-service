# Changelog

## [1.0.1](https://github.com/WMS-Corporation/wms-users-service/compare/v1.0.0...v1.0.1) (2024-05-03)


### Bug Fixes

* Added control if counter collection exists ([c6b2d2c](https://github.com/WMS-Corporation/wms-users-service/commit/c6b2d2cbbf1e70f49c39457910991fc7bdce29b4))
* **deps:** update dependency mongodb to v6.4.0 ([18c2690](https://github.com/WMS-Corporation/wms-users-service/commit/18c269059af07b3ac0e2c8fd2f9c020dd8dc2646))
* Implemented body request field validation for user creation or modification ([c8b4e89](https://github.com/WMS-Corporation/wms-users-service/commit/c8b4e898a98e3163d4f664dbf0f59a3af533a318))
* Implemented the possibility to updated the type of a user ([904b5b7](https://github.com/WMS-Corporation/wms-users-service/commit/904b5b7af4583ba6bdb9994dabe37145c1dfaccc))
* Modified method that update the user data ([dfef51b](https://github.com/WMS-Corporation/wms-users-service/commit/dfef51b744a97a7cdf083edbec24453e3c0feeb4))
* Modified route and method that updated user data ([e4f21eb](https://github.com/WMS-Corporation/wms-users-service/commit/e4f21eb5ba74ab88a5de3837f2a036e54e6cf9c6))
* Modified User Unique Code Generation ([5ac0296](https://github.com/WMS-Corporation/wms-users-service/commit/5ac029619267f86e072154d8ecdb27c4522d0bf1))
* Updated midleware, it can check if users have permissions to access the defined routes. ([64d7ed7](https://github.com/WMS-Corporation/wms-users-service/commit/64d7ed7e91e87d3071559044d9c56ba1e5210904))

## 1.0.0 (2024-03-04)


### Features

* add automatic test, sonarcloud analisys, husky hook and release-please ([4543ac5](https://github.com/WMS-Corporation/wms-users-service/commit/4543ac5e1aba41589d4f6c07b306420a79cc9454))
* **connection:** The connection of the Users microservice to the database has been established. ([0a6af2d](https://github.com/WMS-Corporation/wms-users-service/commit/0a6af2dc8ac3a17e5af0cb7528c2f9b92eb50f0f))
* **getMe:** Implemented route to return the user data ([efff333](https://github.com/WMS-Corporation/wms-users-service/commit/efff333549c39477098a2087af3e70b05416674f))
* Implemented route getAll, to return all users that are stored in a db ([96a1b39](https://github.com/WMS-Corporation/wms-users-service/commit/96a1b39eb48a4fb60e00c57952423c67152fa83e))
* Implemented route to delete user ([abb2561](https://github.com/WMS-Corporation/wms-users-service/commit/abb256179bfa4e86d059ec32dc6afd6188069955))
* Implemented route to update User data ([90a6b09](https://github.com/WMS-Corporation/wms-users-service/commit/90a6b09915c58551ae84f159e637015738b31b65))
* Implemented the route to return the data of the specified user ([b50483e](https://github.com/WMS-Corporation/wms-users-service/commit/b50483efccf30b28440b123fc438d83e2ff1f9e7))
* **login:** Implemented user login mechanism ([c00afeb](https://github.com/WMS-Corporation/wms-users-service/commit/c00afebd6e9a5bcb996219548f54097aad760db3))
* **middleware:** Implemented Middleware for authentication ([259e4d3](https://github.com/WMS-Corporation/wms-users-service/commit/259e4d354a095bda4d37521163062247fc2c4018))
* **register:** Implemented user registration functionality ([12a657e](https://github.com/WMS-Corporation/wms-users-service/commit/12a657e11bd58b63c26195fa6fbaf3e3e61dbaa3))
* The middleware now includes user permission control ([f70b00a](https://github.com/WMS-Corporation/wms-users-service/commit/f70b00ae5ca1ede74c4e4d10548925a3d9bc32ef))


### Bug Fixes

* **ci:** Fix coverage tests ([65ec312](https://github.com/WMS-Corporation/wms-users-service/commit/65ec312afd16b5809fea86afe856caabb50d5c63))
* **ci:** Updated mongoDB setup ([1739660](https://github.com/WMS-Corporation/wms-users-service/commit/1739660a7dc1137abcb3137a52816e58828f1509))
* fix coverage test ([99233f6](https://github.com/WMS-Corporation/wms-users-service/commit/99233f66ffd1d0b6822bf922ba535f7183c03c94))
* Resolved problem about pull request action ([fec3255](https://github.com/WMS-Corporation/wms-users-service/commit/fec3255628a9e18f58eb58cab3f0cddc968dae4b))
