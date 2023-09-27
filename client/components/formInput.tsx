import { Controller, FormState } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';

export const FormInput = ({
  control,
  name,
  placeholder,
  formState,
  ...rest
}: {
  control: any;
  name: string;
  placeholder: string;
  formState: FormState<any>;
}) => {
  let textcontentType: 'emailAddress' | 'password' | 'none';
  switch (name) {
    case 'email':
      textcontentType = 'emailAddress';
      break;
    case 'password':
      textcontentType = 'password';
      break;
    default:
      textcontentType = 'none';
  }
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            textContentType={textcontentType}
            secureTextEntry={name === 'password'}
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
      {formState.errors[name] && formState.touchedFields[name] && (
        <HelperText type="error" padding="none">
          {formState.errors[name]?.message as string}
        </HelperText>
      )}
    </>
  );
};
