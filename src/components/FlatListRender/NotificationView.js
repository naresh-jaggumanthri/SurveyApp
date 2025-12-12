import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NotificationStyle } from '../../styles';
import ReadMore from 'react-native-read-more-text';

const NotificationView = (props) => {
    const { t } = useTranslation();
    const { item, index } = props;

    const _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={NotificationStyles.SeeMoreTextStyle} onPress={handlePress}>
                {t("Read_More_Text")}
            </Text>
        );
    }

    const _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={NotificationStyles.SeeMoreTextStyle} onPress={handlePress}>
                {t("Show_Less_Text")}
            </Text>
        );
    }

    const _handleTextReady = () => {
        // ...
    }
    const { Colors } = useTheme();
    const NotificationStyles = useMemo(() => NotificationStyle(Colors), [Colors]);
    return (
        <View style={NotificationStyles.MinBgWhite}>
            {index === 0 || index === 1 || index === 3 || index === 5 ?
                <View style={NotificationStyles.PostionAbsolute}>
                    <Text style={NotificationStyles.NewTextStylesa}>{t("New_Text")}</Text>
                </View>
                : null}
            <View style={NotificationStyles.ImageViewWidth}>
                <Image source={item.imageseye} resizeMode="contain" style={NotificationStyles.ImageStyle} />
            </View>
            <View style={NotificationStyles.TextViewWidth}>
                <ReadMore numberOfLines={2.5} renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                    onReady={_handleTextReady}>
                    {
                        <Text style={NotificationStyles.TextStyleParegrph}>{t(item.text)}</Text>
                    }
                </ReadMore>
                {index === 0 || index === 1 || index === 3 || index === 5 ?
                    <Text style={NotificationStyles.DateTextStyle}>{t(item.DigitText)}</Text>
                    : null}
                {index === 2 || index === 4 || index === 6 || index === 7 || index === 8 ?
                    <Text style={NotificationStyles.DateTextStyle}>{t(item.DigitText)}</Text>
                    : null}
            </View>
        </View>
    );
}
export default NotificationView;