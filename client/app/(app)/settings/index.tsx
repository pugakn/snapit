import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { globalStyles } from '../../../styles/global';
import { Supabase } from '../../_layout';

export default function Page() {
  const signOut = () => {
    Supabase.auth.signOut();
  };

  return (
    <View style={globalStyles.mainContainer}>
      <View style={[globalStyles.verticalContainer, { width: '100%' }]}>
        <Button mode="contained" style={{ width: '100%' }} onPress={signOut}>
          Sign out
        </Button>
      </View>
    </View>
  );
}
