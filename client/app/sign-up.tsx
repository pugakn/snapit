import { joiResolver } from '@hookform/resolvers/joi';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { View } from 'react-native-animatable';
import { Button, Text, useTheme } from 'react-native-paper';

import { FormInput } from '../components/formInput';
import { useSignupMutation } from '../graphql';
import { globalStyles } from '../styles/global';

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      setValue('avatar', result.assets[0].uri);
    }
  };

  const handleSignUp = handleSubmit(async ({ name, username, password, avatar, email }) => {
    if (isValid) {
      await signup({
        variables: {
          name,
          username,
          password,
          avatar,
          email,
        },
      });
    }
  });

  console.log({ isValid, errors });
  console.log({ signupData });

  return (
    <View style={[globalStyles.mainContainer, { width: '100%', flex: 1 }]}>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            width: '100%',
            flex: 5,
            justifyContent: 'flex-end',
          },
        ]}>
        <FormInput control={control} name="name" placeholder="Name" errors={errors} />
        <FormInput control={control} name="username" placeholder="Username" errors={errors} />
        <FormInput control={control} name="email" placeholder="Email" errors={errors} />
        <FormInput control={control} name="password" placeholder="Password" errors={errors} />

        <Button
          mode="contained"
          style={{ width: '100%' }}
          onPress={pickImage}
          disabled={signupData.loading}>
          Pick Avatar
        </Button>
        <Button
          mode="contained"
          style={{ width: '100%' }}
          loading={signupData.loading}
          onPress={handleSignUp}
          disabled={!isValid || signupData.loading}>
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
    </View>
  );
}
