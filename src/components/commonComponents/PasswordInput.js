import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../utils';
import { Input } from 'react-native-elements';
import { VectorIcon } from '../../components';

function PasswordInput({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  label,
  containerStyle,
  inputContainerStyle,
  errorMessage = "",
  name,
  onPress,
  value,
  onChangeText,
  secureTextEntry
}) {

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          position: 'relative',
          top: SH(-10),
          ...containerStyle,
          marginBottom: SH(0),
        },
        inputContainerStyle: {
          borderBottomWidth: SH(0),
          width: "100%",
          ...inputContainerStyle
        },
        input_style: {
          width: '100%',
          borderColor: Colors.light_gray_text_color,
          fontSize: SF(17),
          fontWeight: '600',
          marginBottom: SH(0),
          fontFamily: Fonts.Poppins_Medium,
          color: Colors.black_text_color,
          paddingVertical: SH(8),
          paddingHorizontal: SH(20),
          borderRadius: 300,
          borderWidth: SH(0.5),
          borderColor: Colors.theme_background,
          backgroundColor: '#f1f5ff',
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(17),
          color: Colors.black_text_color,
          fontFamily: Fonts.Poppins_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(19),
          color: Colors.black_text_color,
          fontFamily: Fonts.Poppins_Medium
        },
        errorStyle: {
          color: Colors.red,
          fontFamily: Fonts.Poppins_Regular,
          height: errorMessage === "" ? SH(0) : undefined,
          margin: 0,
        },
        IconPostionAboluteTwo: {
          position: 'absolute',
          right: SH(30),
          height: SH(50),
          flexDirection: 'row',
          alignItems: 'center'
        },
      }),
    [title, titleStyle, inputStyle, containerStyle, inputContainerStyle, errorMessage]
  );

  // Safe handler to prevent passing raw press events or calling undefined props
  const handleTogglePress = (e) => {
    if (e && typeof e.persist === 'function') {
      e.persist();
    }
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <Input
        name="password"
        maxLength={14}
        rightIcon={
          <TouchableOpacity 
            style={styles.IconPostionAboluteTwo} 
            onPress={handleTogglePress}
            activeOpacity={0.7}
          >
            <VectorIcon
              name={name}
              size={SF(25)}
              color={Colors.gray_text_color}
              icon="Ionicons"
            />
          </TouchableOpacity>
        }
        label={label}
        value={value}
        placeholder={placeholder}
        autoCorrect={false}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={Colors.gray_text_color}
        textContentType="newPassword"
        secureTextEntry={secureTextEntry}
        enablesReturnKeyAutomatically
        onChangeText={(text) => {
          if (typeof onChangeText === 'function') {
            onChangeText(text ?? '');
          }
        }}
      />
    </View>
  );
}

PasswordInput.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  containerStyle: {},
  inputContainerStyle: {},
  onChangeText: () => { },
  onPress: () => { },
  onFocus: () => { },
  onBlur: () => { },
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
  autoCompleteType: '',
  onEndEditing: () => { },
};

PasswordInput.propTypes = {
  title: propTypes.string,
  autoCompleteType: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  containerStyle: propTypes.shape({}),
  inputContainerStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  onPress: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
  onEndEditing: propTypes.func,
  secureTextEntry: propTypes.bool,
  name: propTypes.string,
  errorMessage: propTypes.string,
};

export default PasswordInput;