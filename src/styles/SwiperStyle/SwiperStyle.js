import { Fonts, SH, SW, SF } from '../../utils';
import { StyleSheet } from 'react-native';

export default SwiperStyle = (Colors) => StyleSheet.create({
  BottomViewBgcolor: {
    backgroundColor: Colors.theme_background,
    width: '100%',
    bottom: 0,
  },
  ScrollViewStyle: {
    height: 'auto',
    width: '100%'
  },
  SwiperMinView: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white_text_color
  },
  SwiperMinViewTwo: {
    width: '100%',
    position: 'absolute',
    bottom: 0,

  },
  SwiperMinViewTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  SwiperMinViewRight: {
    width: SW(120),
    position: 'absolute',
    bottom: SH(-20),
    backgroundColor: Colors.theme_background_Second,
    height: SH(120),
    borderRadius: 100,
    right: SH(-30)
  },
  Second: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  // SwiperMinViewTwo: {
  //   // backgroundColor: Colors.theme_background,
  //   height: 400,
  //   width: '100%',
  //   position: 'absolute',
  //   bottom: -20,
  //   borderTopRightRadius: 20,
  //   borderTopLeftRadius: 20,
  // },
  TitleStyles: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(22),
    textAlign: 'center',
    lineHeight: SH(36)
  },
  Textstyle: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(15),
    textAlign: 'center',
    opacity: 0.7
  },
  NextTextStyle: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    textAlign: 'center',
    fontWeight: '700'
  },
  ButtonCircle: {
    top: SH(5)
  },
  AnimationViewStyles: {
    height: SH(350),
    width: '100%',
    position: 'absolute'
  },
  AbsoluteView: {
    position: 'absolute',
    bottom: SH(60),
    width: '100%',
    paddingHorizontal: SH(10),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  CenterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  DotSwiperStyle: {
    width: SW(9),
    height: SW(9),
    borderRadius: 300,
    backgroundColor: Colors.theme_background,
    opacity: 0.5
  },
  ActiveDotStyles: {
    width: SW(13),
    height: SW(13),
    borderRadius: 300,
    backgroundColor: Colors.theme_background,
  },
  BottomImageShapp: {
    width: '100%',
    height: SH(300)
  }
});