import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Style } from '../../styles';
import moment from 'moment';
import VectorIcon from './VectoreIcons';
import { Colors, SF } from '../../utils';

function DatePicker(props) {
    const [dateselcet, setdateselcet] = useState('Select Date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDateTimePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDatePicked = (date) => {
        hideDateTimePicker(),
            setdateselcet(moment(date, "YYYY-MM-DDTHH:mm:ss Z").local().format('DD-MM-YYYY'));
    };

    return (
        <View>
            <View style={Style.inputUnderLine}>
                <View style={Style.FlexEditView}>
                    <TouchableOpacity onPress={() => showDateTimePicker()}>
                        <Text style={Style.datetextstyles}>{dateselcet}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.dobView} onPress={() => showDateTimePicker()}>
                        <VectorIcon icon="MaterialIcons" name="date-range" size={SF(30)} color={Colors.theme_background} />
                    </TouchableOpacity>
                </View>
            </View>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
            />
        </View>
    )
}
export default DatePicker;