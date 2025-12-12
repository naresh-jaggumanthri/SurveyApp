import React, { useMemo } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ChatStyles } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const MessageListData = (props) => {
    const { t } = useTranslation();
    const { item, onPress } = props;
    const { Colors } = useTheme();
    const ChatStyle = useMemo(() => ChatStyles(Colors), [Colors]);
   
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={ChatStyle.SetWhiteBox}>
                <View style={ChatStyle.FlexRowSetImage}>
                    <View style={ChatStyle.ImageCenterStyleTop}>
                        <Image style={ChatStyle.ImagStyle} resizeMode="cover" source={item.image} />
                    </View>
                    <View style={ChatStyle.ListDotViewStyle}>
                        {item.icon}
                    </View>
                    <View style={ChatStyle.ImageCenterStyle}>
                        <Text style={ChatStyle.TextUserName}>{t(item.text)}</Text>
                        <View style={ChatStyle.Flextimeroe}>
                            <Text style={ChatStyle.TextUserNameSmall}>{t(item.texttwoset)}</Text>
                            <Text style={ChatStyle.TextUserNameSmall}>{t(item.settime)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default MessageListData;