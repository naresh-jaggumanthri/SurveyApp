import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, TouchableOpacity } from "react-native";
import { ProfileTabStyles } from '../../styles';
import { SF } from '../../utils';
import { VectorIcon } from '../../components';
import { useTranslation } from "react-i18next";

const ProfileAccountView = (props) => {
    const { item, onPress } = props;
    const { t } = useTranslation();

    const { Colors } = useTheme();
    const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);

    return (
        <TouchableOpacity style={ProfileTabStyle.MinViewBgwhite} onPress={() => onPress()}>
            <Text style={ProfileTabStyle.TextStyle}>{t(item.text)}</Text>
            <VectorIcon size={SF(22)} icon="Entypo" name="chevron-right" />
        </TouchableOpacity>
    );
}
export default ProfileAccountView;