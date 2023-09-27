import { joiResolver } from '@hookform/resolvers/joi';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';

import { FormInput } from '../components/formInput';
import { useSignupMutation } from '../graphql';
import { globalStyles } from '../styles/global';
import { Supabase } from './_layout';

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should be at least 6 characters',
  }),
  avatar: Joi.string().max(10485760).optional().messages({
    'string.max': 'Image size should be less than or equal to 10MB',
    'any.required': 'Please upload an image',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
}).messages({
  'string.empty': 'This field is required',
  'string.min': 'This field is required',
  'string.email': 'Please enter a valid email',
});

export default function SignUpPage() {
  const { colors } = useTheme();
  const [signup, signupData] = useSignupMutation({ fetchPolicy: 'no-cache' });
  const [image, setImage] = useState<string | undefined>(undefined);

  const { control, handleSubmit, setValue, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      username: '',
      password: '',
      avatar: undefined as string | undefined,
      email: '',
    },
    resolver: joiResolver(schema),
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    console.log(result);
    if (!result.canceled) {
      setValue('avatar', result.assets[0].base64!);
      setImage(result.assets[0].uri);
    }
  };

  const handleSignUp = handleSubmit(async ({ name, username, password, avatar, email }) => {
    if (formState.isValid) {
      const res = await signup({
        variables: {
          name,
          username,
          password,
          avatar,
          email,
        },
      });

      if (res.data?.signup?.accessToken && res.data?.signup?.refreshToken) {
        await Supabase.auth.setSession({
          access_token: res.data.signup.accessToken,
          refresh_token: res.data.signup.refreshToken,
        });
      }
    }
  });

  console.log({ signupData });

  return (
    <KeyboardAwareScrollView contentContainerStyle={[globalStyles.mainContainer, { flexGrow: 1 }]}>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            width: '100%',
            flex: 5,
          },
        ]}>
        <TouchableOpacity
          onPress={pickImage}
          disabled={signupData.loading}
          style={{ marginBottom: 40, position: 'relative' }}>
          {image && (
            <Avatar.Image
              size={185}
              source={{ uri: image }}
              style={{ backgroundColor: colors.elevation.level5 }}
            />
          )}
          {!image && (
            <Avatar.Icon
              size={185}
              icon="account"
              style={{ backgroundColor: colors.elevation.level5 }}
            />
          )}
          <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <IconButton
              icon="pencil"
              size={18}
              onPress={pickImage}
              disabled={signupData.loading}
              iconColor={colors.background}
              containerColor={colors.primary}
            />
          </View>
        </TouchableOpacity>
        <FormInput control={control} name="name" placeholder="Name" errors={formState.errors} />
        <FormInput
          control={control}
          name="username"
          placeholder="Username"
          errors={formState.errors}
        />
        <FormInput control={control} name="email" placeholder="Email" errors={formState.errors} />
        <FormInput
          control={control}
          name="password"
          placeholder="Password"
          errors={formState.errors}
        />

        <Button
          mode="contained"
          style={{ width: '100%' }}
          loading={signupData.loading}
          onPress={handleSignUp}
          disabled={!formState.isValid || signupData.loading}>
          Sign up
        </Button>
      </View>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          },
        ]}>
        <Text>
          Already have an account?{'  '}
          <Link href="/sign-in" style={{ color: colors.primary }}>
            Sign in
          </Link>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
