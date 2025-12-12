import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ChatStyles, Style } from '../../styles';
import { SH, SF } from "../../utils";
import { Spacing, VectorIcon, ChatDataView, Input, Container } from '../../components';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import images from '../../images';

const Chatscreen = (props) => {
    const { detailsStore } = useSelector(state => state.DataReducer) || { detailsStore };
    const { Colors } = useTheme();
    const [Reply, setReply] = useState('');
    const { navigation } = props;
    const ChatStyle = useMemo(() => ChatStyles(Colors), [Colors]);
    const { t } = useTranslation();
 const ChatDataText = [
        {
          "id": 1,
          "ChatSelf": 'ChatText_Let_Me',
          "ChatTime": '03:16',
          "DateText": 'Ten_Oct',
          "DateText_Actually": 'Chattext_Actually_I_Have',
          "ChatTime_User": '03:18',
         
        },
        {
          "id": 2,
          "ChatSelf": 'Chat_Can_You_Just',
          "ChatTime": '03:19',
          "DateText": 'Ten_Oct',
          "DateText_Actually": 'Chat_Multipal_Project',
          "ChatTime_User": '03:19',
        },
        {
          "id": 3,
          "ChatSelf": 'Chat_Excellent',
          "ChatTime": '03:20',
          "DateText": 'Ten_Oct',
          "DateText_Actually": 'Chat_Multipal_Project',
          "ChatTime_User": '03:19',
        },
        {
          "id": 4,
          "ChatSelf": 'Chat_Excellent',
          "ChatTime": '03:20',
          "DateText": 'Ten_Oct',
          "DateText_Actually": 'Chat_Last_Paregraph',
          "ChatTime_User": '03:20',
        },
      ]
    return (
        <Container>
            <View style={ChatStyle.MinViewScreen}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.ScrollViewTestHeight}>
                    <KeyboardAvoidingView enabled>
                        <View style={ChatStyle.MinFlexView}>
                            <View style={ChatStyle.MinContentView}>
                                <FlatList
                                    data={ChatDataText}
                                    numColumns={1}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (<ChatDataView onPress={() => navigation.navigate(RouteName.HOME_DETAILS_SCREEN)}
                                        item={item}
                                    />)}
                                    keyExtractor={item => item.id}
                                />
                                <Spacing space={SH(17)} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={ChatStyle.PostionAbsoluTeView}>
                    <View style={ChatStyle.TextMessageView}>
                        <View style={ChatStyle.FlexrowSendMesasage}>
                            <View style={ChatStyle.InputWidtgh}>
                                <Input
                                    onChangeText={(value) => setReply(value)}
                                    value={Reply}
                                    inputStyle={ChatStyle.TextInputBorderBottom}
                                    placeholder={t("Write_A_Reply")}
                                    placeholderTextColor={Colors.gray_text_color}
                                />
                            </View>
                            <View style={ChatStyle.FlexrowImagiNations}>
                                <TouchableOpacity>
                                    <VectorIcon icon="FontAwesome5" name="grin" color={Colors.theme_backgound} size={SF(25)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={ChatStyle.MarginRightlikeicon}>
                                    <VectorIcon icon="Ionicons" name="send" color={Colors.theme_backgound} size={SF(30)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Container>
    );
};
export default Chatscreen;
