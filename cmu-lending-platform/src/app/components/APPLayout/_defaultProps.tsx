import {
    CrownFilled,
    SmileFilled,
  } from '@ant-design/icons';
  
  export default {
    route: {
      path: '/',
      routes: [
        {
          path: '/CMULending',
          name: 'dashboard',
          icon: <SmileFilled />,
          component: './Welcome',
        },
        {
          path: '/admin',
          name: 'market',
          icon: <CrownFilled />,
          access: 'canAdmin',
          component: './Admin',

        },
      ],
    },
    location: {
      pathname: '/',
    },
  };