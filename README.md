## Description

This is a portfolio to show my skill in developing the backend using typescript with nestjs. This is just a simple receivable tracker.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## API Requirement

### Create Receivable

Method: POST

URL: /

Request Body:

```
{
  "clientName": string,
  "totalDebt": number,
  "tenure": number
}
```

This request didn't return any JSON file. Most of the other API backends will return JSON body

### Get Receivable

Method: GET

URL: /:id

Return Body:

```
{
  "clientName": string,
  "totalDebt": number,
  "tenure": number,
  "monthPaid": number
}
```

### Update Receivable

Method: PUT

URL: /:id

Request Body:

```
{
  "tenure": number,
  "monthPaid": number
}
```

This request didn't return any JSON file. Most of the other API backends will return JSON body

### Delete Receivable

Method: DELETE

URL: /:id

This request didn't return any JSON file. Most of the other API backends will return JSON body

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
