import StackUser from '../../layouts/stackUser';

export const unstable_settings = {
  initialRouteName: '[user]/index',
};

export default function Layout({ segment }: any) {
  return <StackUser />;
}
