# HardwareSwap

Buy, sell, and trade hardware with users around the country. HardwareSwap allows users to create accounts, make listings, and comment on other peoples post. Post are sent to firestore and displayed on the page. Inspired by /r/HardwareSwap.


![Image of HardwareSwap](https://www.mjdiggs.com/images/hardwareswap.png)


[![Netlify Status](https://api.netlify.com/api/v1/badges/696e4f7f-66bf-4bee-94cc-1acc750d1242/deploy-status)](https://app.netlify.com/sites/xenodochial-cray-5f5421/deploys)

### Purpose

The goal with HardwareSwap was to create my first decently sized project in React. I started off with the design in Adobe XD which is very similar to the HardwareSwap subreddit on Reddit. To handle the user post, comments, and authenication, I decided to use Firebase and Firestore to house everything. The postings for buying, selling, and trading would then be submitted to the  database and then brought back to the home page. The different colors for each post were used to differentiate each post type. After retrieving the post, I created a simple routing system using UUID to generate unique routes for each post entry. Once in the post, users could comment on the item if they were interested. The creators of the post could also decided to delete their post if they changed their mind or had a successful trade.

### Features

- Create accounts to get started buying, selling, or trading hardware
- Message users to discuss potentional trade deals
- Manage and browse hardware post to discover new deals


### Technologies

HardwareSwap was created using the following tools:

- [React](https://github.com/facebook/react) - JavaScript library for building user interfaces.
- [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
- [React Hot Toast](https://github.com/timolins/react-hot-toast) - Smoking hot React Notifications 🔥
- [React Markdown](https://github.com/remarkjs/react-markdown) - Convert text to markdown
- [Firebase](https://firebase.google.com/) - Firebase is a platform developed by Google for creating mobile and web applications
- [DayJS](https://github.com/iamkun/dayjs) -  Immutable date-time library alternative to Moment.js
- [UUID](https://github.com/uuidjs/uuid) - Generate RFC-compliant UUIDS
