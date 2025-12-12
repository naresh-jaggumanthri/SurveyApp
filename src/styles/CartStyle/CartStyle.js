import { Fonts, SH, SW, SF, widthPercent, Colors } from '../../utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ButtonCircle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleStyles: {
    color: Colors.black_text_color,
    fontSize: SF(25),
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    paddingHorizontal: SH(15),
    position: 'absolute',
    top: SH(100),
    width: '100%',
  },
  Textstyle: {
    paddingHorizontal: SH(10),
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    fontSize: SF(16),
    position: 'absolute',
    bottom: SH(120),
    width: '100%'
  },
  buttonStyle: {
    width: widthPercent(90),
    marginRight: SH(6)
  },
  ScrollViewStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white_text_color,
  },
  AnimationViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  NextTextStyle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(19),
    color: Colors.theme_background,
  },
  ActiveDotStyles: {
    width: SW(14),
    height: SH(16),
    borderRadius: 100,
    backgroundColor: Colors.theme_background,
  },
  iconbgcolorview: {
    width: SW(30),
    height: SH(20),
    borderRadius: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: SH(10),
    right: SH(10),
  },
  ImageStyle: {
    height: SW(150),
    width: SW(150),
  },
  ImageViewstyle: {
    height: SW(200),
    width: SW(200),
    borderWidth: 1,
    borderColor: Colors.theme_background,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200
  },
  ImageBgcolorView: {
    backgroundColor: Colors.white_text_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: SH(15)
  },
  TopTitleSetCompany: {
    width: '100%'
  },
  TextStyle: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Bold,
    fontSize: SF(22),

  },
  BlackTextStyle: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Italic,
    fontSize: SF(17),
  },
  LottieView: {
    position: 'absolute',
  },
  SetBorderView: {
    backgroundColor: Colors.blue_color,
    height: SW(25),
    width: SW(25),
    borderRadius: 3
  },
  SetBorderViewBlack: {
    backgroundColor: Colors.black_text_color,
    height: SW(25),
    width: SW(25),
    borderRadius: 3,
    marginVertical: SH(10)
  },
  SetBorderViewTheme: {
    backgroundColor: Colors.theme_background,
    height: SW(25),
    width: SW(25),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SetPostionView: {
    position: 'absolute',
    bottom: SH(0),
    right: SH(20),
  },
  OneDigitStyle: {
    backgroundColor: Colors.theme_background,
    width: SW(30),
    height: SW(30),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SH(20)
  },
  OneDigitStyleTwo: {
    backgroundColor: Colors.theme_background,
    width: SW(30),
    height: SW(30),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SH(20)
  },
  FlexViewStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NormalTextStyle: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17)
  },
  WhitebgColor: {
    paddingHorizontal: SH(20),
    width: '100%',
  },
  TextColorDigit: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(22),
  },
  TextParegraph: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Italic,
    fontSize: SF(17),
  },
  FlexRowHeight: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white_text_color,
  },
  ReviewsTextStyles: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(20),
  },
  ReviewImageStyle: {
    height: SW(40),
    width: SW(40),
    borderRadius: 300
  },
  ReviewImageStyleTwo: {
    height: SW(40),
    width: SW(40),
    borderRadius: 300,
    right: SH(15)
  },
  ReviewImageStyleThree: {
    height: SW(40),
    width: SW(40),
    borderRadius: 300,
    right: SH(30)
  },
  ReviewImageStyleFour: {
    height: SW(40),
    width: SW(40),
    borderRadius: 300,
    right: SH(40)
  },
  ReviewImageStyleFive: {
    height: SW(40),
    width: SW(40),
    borderRadius: 300,
    right: SH(50),
    backgroundColor: Colors.theme_background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  FlexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextColorWhite: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(12)
  },
  FlexRowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  IconView: {
    position: 'absolute',
    top: SH(15),
    left: SH(10),
    zIndex: 3453,
    borderWidth: 1,
    borderColor: Colors.theme_background,
    width: SW(50),
    height: SW(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300
  },
  BackgroundColor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SH(20),
    backgroundColor: Colors.white_text_color,
    paddingVertical: SH(10),
    borderTopWidth:1,
    borderColor:Colors.light_gray_text_color
  },
  PriceTextStyle: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(20)
  },
  WidthPostion: {
    width:widthPercent(50)
  }
});