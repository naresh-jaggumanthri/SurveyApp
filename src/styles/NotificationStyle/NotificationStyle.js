import { StyleSheet, } from 'react-native';
import { SH, Fonts, SW, SF } from '../../utils';

export default NotificationStyle = (Colors) => StyleSheet.create({
  ImageStyle: {
    width: SW(80),
    height: SW(80),
    borderRadius: SH(10)
  },
  MinBgWhite: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: SH(10),
    borderBottomColor: Colors.light_gray_text_color,
  },
  ImageViewWidth: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextViewWidth: {
    width: '70%',
    paddingRight: SH(10)
  },
  TextStyleParegrph: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(16)
  },
  WhiteNotifoication: {
    backgroundColor: Colors.white_text_color,
    width: '100%',
    borderRadius: SH(20)
  },
  PostionAbsolute: {
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.red,
    paddingHorizontal: SH(15),
    zIndex: 12,
    borderTopLeftRadius: SH(10),
    borderBottomRightRadius: SH(10)
  },
  NewTextStylesa: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(14)
  },
  DateTextStyle: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    textAlign: 'right',
    top: SH(5),
  },
  TextStyle: {
    paddingLeft: SH(5)
  },
  SeeMoreTextStyle: {
    top: SH(5),
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18)
  }
});
