import { StyleSheet } from 'react-native';
import { SF, Fonts, SW, SH, Colors } from '../../utils';

export default StyleSheet.create({
  ImageStyles: {
    height: SW(80),
    width: SW(80),
    borderRadius: 10
  },
  ImageStylesCheckout: {
    height: SW(50),
    width: SW(50),
    borderRadius: 10
  },
  ImageStylesMinView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(10),
    marginHorizontal: SH(15),
    borderStyle: 'dashed',
    borderColor: Colors.gray_text_color,
    marginTop: SH(20),
    paddingBottom: SH(10),
    backgroundColor: Colors.white_text_color,
    borderRadius: SH(10)
  },
  ImageStylesMinViewTwo: {
    borderTopWidth: 1,
    borderColor: Colors.light_gray_text_color,
    position:'relative',
    zIndex:23
  },
  TextViewText: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17)
  },
  TextBlack: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17)
  },
  TextBlacks: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    opacity: 0.7,
    fontSize: SF(17)
  },
  FlexViewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  PriceText: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
  },
  PriceTexts: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    paddingHorizontal: SH(15),
  },
  TextView: {
    paddingLeft: SH(15),
    width: '80%'
  },
  FlexRowPlusView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  MinFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  FlexCheckoutView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  WidthSet80: {
    width: '70%',
    flexDirection: 'row'
  },
  ColorWhite: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(14),
    color: Colors.white_text_color,
  },
  SetBgColors: {
    backgroundColor: Colors.theme_background,
    position: 'absolute',
    zIndex: 23,
    paddingHorizontal: SH(20),
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10
  },
  PostionAbsolute: {
    position: 'absolute',
    right: SH(15),
    top: SH(5),
    zIndex: 23
  }
});