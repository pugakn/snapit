import StackUser from '../../layouts/stackUser';

export const unstable_settings = {
  initialRouteName: 'feed',
};

export default function Layout({ segment }: any) {
  return <StackUser />;
}
