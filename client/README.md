<head>
    <div align="center">
        <h1 align="center">Webster (Client)</h1>
    </div>
</head>

<div align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" />
  <img alt="react" src="https://img.shields.io/badge/-React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="redux" src="https://img.shields.io/badge/-Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="react router" src="https://img.shields.io/badge/-React%20Router-CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white" />
  <img alt="Chakra UI" src="https://img.shields.io/badge/-Chakra%20UI-319795.svg?style=for-the-badge&logo=ChakraUI&logoColor=white" />
  <img alt="konva" src="https://img.shields.io/badge/-konva-0D83CD.svg?style=for-the-badge&logo=konva&logoColor=white" />
  <img alt="unsplash" src="https://img.shields.io/badge/-unsplash%20API-000000.svg?style=for-the-badge&logo=unsplash&logoColor=white" />
  <img alt="google fonts" src="https://img.shields.io/badge/-Google%20Fonts%20API-4285F4.svg?style=for-the-badge&logo=Google-Fonts&logoColor=white" />
  <img alt="Progressive Web Apps" src="https://img.shields.io/badge/Progressive%20Web%20Apps-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white" />
</div>

</br>

## About

A graphic-design application, written in React, with the use of Konva, Redux, Chakra UI, Unsplash API & Google Fonts API.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example`. Make sure your `PORT` in the `server/.env` file is part of the `VITE_API_URL` in your `client/.env`.
Then proceed:

- Create a Unsplash account and use the provided test API keys.
- Get [Google fonts API key](https://developers.google.com/fonts/docs/developer_api) and use the provided key.
- Run `yarn install` in the `client/` directory.
- Run `yarn run dev`.

## Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html#building-the-app) for more information.
