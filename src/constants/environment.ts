export type Environment = {
  api: {
    baseUrl: string;
  };
};

const development: Environment = {
  api: {
    baseUrl: 'https://randomuser.me/api',
  },
};
const currentEnvironment = development;

export default currentEnvironment;
