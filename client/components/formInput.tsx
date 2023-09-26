import { Controller } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';

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
