import { StyleSheet } from 'react-native';

export const globalTokens = {
  storybuttonSize: 80,
  gap: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },
};

export const globalStyles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fullContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: globalTokens.gap.lg,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: globalTokens.gap.lg,
  },
});
