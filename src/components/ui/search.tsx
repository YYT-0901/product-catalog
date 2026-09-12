import type {
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export type SearchProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  onClear?: () => void;
};

export function Search({
  value,
  placeholder = 'Search products',
  onChangeText,
  onClear,
  containerStyle,
  style,
  ...props
}: SearchProps) {
  const hasValue =
    typeof value === 'string' ? value.length > 0 : Boolean(value);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.searchIcon}>⌕</Text>
      </View>

      {/* Input */}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        onChangeText={onChangeText}
        style={[styles.input, style]}
        accessibilityRole="search"
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor="#111827"
        {...props}
      />

      {/* Clear button */}
      {hasValue ? (
        <Pressable
          onPress={onClear}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#ffffff',

    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e7e2dd',

    minHeight: 54,
    paddingHorizontal: 8,

    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#f5f2ef',
    marginRight: 8,
  },

  searchIcon: {
    color: '#374151',
    fontSize: 23,
    fontWeight: '500',
    lineHeight: 25,
    transform: [{ rotate: '-90deg' }],
  },

  input: {
    flex: 1,

    color: '#111827',
    fontSize: 15,
    fontWeight: '500',

    paddingVertical: 0,
    paddingHorizontal: 2,

    minHeight: 40,
  },

  clearButton: {
    width: 30,
    height: 30,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#f3f4f6',
    marginLeft: 6,
  },

  clearButtonPressed: {
    backgroundColor: '#e5e7eb',
  },

  clearText: {
    color: '#4b5563',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 21,
    marginTop: -2,
  },
});