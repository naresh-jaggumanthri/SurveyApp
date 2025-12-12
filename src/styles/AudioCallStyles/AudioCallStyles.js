import { StyleSheet } from 'react-native';
import { SF, Fonts, SW, SH, Colors, widthPercent } from '../../utils';

export default StyleSheet.create({
  MinViewStyle: {
    backgroundColor: Colors.theme_background,
    height: '100%',
    width: '100%',
  },
  CenterTextAppName: {
    color: Colors.white_text_color,
    textAlign: "center",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(22),
    opacity: 0.7
  },
  TextCenter: {
    color: Colors.white_text_color,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(22),
  },
  TimeTextStyle: {
    color: Colors.white_text_color,
    textAlign: "center",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    opacity: 0.6
  },
  ImageStyle: {
    width: SW(150),
    height: SW(150),
    borderRadius: 300
  },
  CenterImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  PostionAbasoluteView: {
    position: 'absolute',
    bottom: SH(20),
    width: '100%',
    paddingHorizontal: SH(40)
  },
  FlexRowTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  MuteTextStyle: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    paddingTop: SH(10),
    opacity: 0.7,
    textAlign: 'center'
  },
  IconView: {
    height: SW(60),
    width: SW(60),
    borderWidth: 1,
    borderColor: Colors.light_gray_text_color,
    borderRadius: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  CallEndView: {
    height: SW(60),
    width: SW(60),
    backgroundColor: Colors.red,
    borderRadius: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  CenterViewMin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  WidthSetView: {
    width: '30%',
  },
  CenterIconStyle: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});