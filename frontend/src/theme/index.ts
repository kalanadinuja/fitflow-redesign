export const colors = {
  background: '#F4F6F8',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  accent: '#0F766E',
  accentMuted: '#D1FAE5',
  accentSoft: '#ECFDF5',
  border: '#E5E7EB',
  track: '#E5E7EB',
  white: '#FFFFFF',
  overlay: 'rgba(17, 24, 39, 0.45)',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
};

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  full: 999,
};

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
  heading: { fontSize: 20, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.text },
  secondary: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '500' as const, color: colors.textSecondary },
  button: { fontSize: 16, fontWeight: '700' as const, color: colors.white },
};

export const shadow = {
  card: {
    boxShadow: '0 2px 8px rgba(17, 24, 39, 0.06)',
    elevation: 2,
  },
};
