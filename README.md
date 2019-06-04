
   ![][logo]

   [logo]: ./readme_imgs/tile.png "Product Logo"

# Community Banking

By [Omar Azeemi](https://github.com/oazeemi), [Muatasim Qazi](https://github.com/muatasimqazi),
[Alexis Lim](https://github.com/calim) & [Kidus Sendeke](https://github.com/Kidusyohanes)

## What 
A web platform that connects students with their trusted friends and family to create a strong financial community to address student debt.


## Architecture

![Overall][arch]

[arch]: readme_imgs/architecture.png "Logo Title Text 2"


## APIs & Methods

| End point      | Method  |  Description |  Type     |  Service source       |
|----------------|---------|--------------|-----------|---------|
|**api.ahod.finance/v1/users/{id}**| GET, PATCH     | get or update user profile  | `Requires Log-in` | Gateway |
|**api.ahod.finance/v1/users**| POST, GET     | log-in to the website, Get searches for users | `Requires Log-in` | Gateway |
|**api.ahod.finance/v1/sessions**| GET     | looks for credentials and begins sessions | `Open` | Gateway |
|**api.ahod.finance/v1/sessions/**| DELETE     | ends current session | `Requires Log-in` | Gateway |
|**api.ahod.finance/v1/groups**| POST   | create groups | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}**| GET, PUT | get or update group details  | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/members**| GET, POST | get all members of a specific group or add a new member | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/invite**| POST | invite a new member to group  | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/plea**| GET, POST | get or create a new plea to a group | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/plea**| GET, POST | get or create a new plea to a group | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/plea/{pleaId}**| GET, POST | get a sincle plea or like/unlike | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/groups/{id}/round**| GET, POST | get all the rounds or create a new round for the group | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/members/{id}**| GET, PUT | get or update member details  | `Requires Log-in` | Micro-service |
|**api.ahod.finance/v1/members/{id}/groups**| GET | get one member's groups  | `Requires Log-in` | Micro-service |


Endpoints for the Payment microservice are documented in the readme located in the servers/Payment folder

## **Tech Stack** 
#### Client Side 
* React
#### Server Side
> Microservices & APIs
* Golang for Gateway
* Node for Microservice
> DB 
* MySql
* Redis
* Mongo
> 3rd Party dependencies 
* Pusher
* SendGrid
