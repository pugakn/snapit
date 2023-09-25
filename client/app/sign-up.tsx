import { joiResolver } from '@hookform/resolvers/joi';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native-animatable';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';

import { useSignupMutation } from '../graphql';
import { globalStyles } from '../styles/global';

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().max(10485760),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export const FormInput = ({
  control,
  name,
  placeholder,
  errors,
  ...rest
}: {
  control: any;
  name: string;
  placeholder: string;
  errors: any;
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={{ width: '100%' }}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <HelperText type="error" padding="none">
          {errors[name]?.message}
        </HelperText>
      )}
    </>
  );
};

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
      avatar: '',
      email: '',
    },
    resolver: joiResolver(schema),
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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

  return (
    <View style={[globalStyles.mainContainer, { width: '100%', flex: 1 }]}>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            width: '100%',
            flex: 3,
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
          <Link href="sign-in" style={{ color: colors.primary }}>
            Sign in
          </Link>
        </Text>
      </View>
    </View>
  );
}
