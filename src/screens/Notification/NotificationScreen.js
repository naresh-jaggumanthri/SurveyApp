import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList, ScrollView } from "react-native";
import { NotificationStyle, Style } from '../../styles';
import images from '../../index';
import { Spacing, Container, NotificationView } from '../../components';
import { SH } from '../../utils';

const NotificationScreen = () => {
  const CategoryData = [
    {
      "id": 1,
      "text": 'Notification_Paregraph_1',
      "imageseye": images.Notification_1,
      "DigitText": "Notification_date_1"
    },
    {
      "id": 2,
      "text": 'Notification_Paregraph_2',
      "imageseye": images.Notification_2,
      "DigitText": "Notification_date_2"
    },
    {
      "id": 3,
      "text": 'Notification_Paregraph_3',
      "imageseye": images.Notification_3,
      "DigitText": "Notification_date_3"
    },
    {
      "id": 4,
      "text": 'Notification_Paregraph_4',
      "imageseye": images.Notification_4,
      "DigitText": "Notification_date_4"
    },
    {
      "id": 5,
      "text": 'Notification_Paregraph_5',
      "imageseye": images.Notification_5,
      "DigitText": "Notification_date_5"
    },
    {
      "id": 6,
      "text": 'Notification_Paregraph_6',
      "imageseye": images.Notification_6,
      "DigitText": "Notification_date_6"
    },
    {
      "id": 7,
      "text": 'Notification_Paregraph_7',
      "imageseye": images.Notification_7,
      "DigitText": "Notification_date_7"
    },
    {
      "id": 8,
      "text": 'Notification_Paregraph_8',
      "imageseye": images.Notification_8,
      "DigitText": "Notification_date_8"
    },
    {
      "id": 9,
      "text": 'Notification_Paregraph_9',
      "imageseye": images.Notification_9,
      "DigitText": "Notification_date_9"
    },
  ]
  const { Colors } = useTheme();
  const NotificationStyles = useMemo(() => NotificationStyle(Colors), [Colors]);
  
  return (
    <Container>
      <ScrollView>
        <View style={Style.Container}>
          <View style={Style.MinViewContent}>
            <Spacing space={SH(20)} />
            <View style={NotificationStyles.WhiteNotifoication}>
              <FlatList
                data={CategoryData}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (<NotificationView
                  item={item}
                  index={index}
                />)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
export default NotificationScreen;