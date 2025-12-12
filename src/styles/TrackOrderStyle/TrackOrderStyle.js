import { StyleSheet, } from 'react-native';
import { SH, Fonts, Colors, SW, SF } from '../../utils';

export default StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    height: 'auto'
  },
  minstyleviewphotograpgy: {
    justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  bgcolorset: {
    backgroundColor: Colors.white_text_color
  },
  keybordtopviewstyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minviewsigninscreen: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
  },
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: SH(20),
    paddingTop: SH(5),
  },
  trackorderviewwhite: {
    backgroundColor: Colors.white_text_color,
    marginTop: SH(10),
    borderRadius: SW(17),
    padding: SW(10)
  },
  imagesetus: {
    height: SH(100),
    width: SW(100),
  },
  setimagewisdth: {
    width: '30%',
    marginRight: SW(20),
  },
  setviewwoidth70: {
    width: '60%',
  },
  settextcolor: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    lineHeight: SH(20),
    color: Colors.theme_background
  },
  setminviewflex: {
    flexDirection: 'row',
  },
  settextcolortwo: {
    borderTopWidth: 1,
    borderTopColor: Colors.light_gray_text_color,
    paddingTop: SH(5),
    marginTop: SH(10),
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(15),
    lineHeight: SH(20),
  },
  settextcolorthree: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(15),
    lineHeight: SH(20),
    paddingTop: SH(7),
  },
  trackorderscreenset: {
    backgroundColor: Colors.white_text_color,
    marginTop: SH(20),
    borderRadius: SW(13),
    padding: SW(10),
    paddingBottom: SH(45),
    flexDirection: 'row',
  },
  dotstyle: {
    width: SW(15),
    height: SW(15),
    borderRadius: SW(100),
    backgroundColor: Colors.theme_background
  },
  setline: {
    width: SW(3),
    height: SH(70),
    borderRightWidth: SW(2),
    position: 'relative',
    left: SW(6),
    borderColor: Colors.theme_background
  },
  setlinetwo: {
    width: SW(3),
    height: SH(70),
    borderRightWidth: SW(2),
    border_color: Colors.light_gray_text_color,
    position: 'relative',
    left: SW(6),
    borderStyle: 'dashed'
  },
  dotviewmin: {
    marginRight: SW(20),
    paddingTop: SH(17),
  },
  topspaceminview: {
    position: 'relative',
    top: SH(40),
  },
  topspaceminviewtwo: {
    position: 'relative',
    top: SH(80),
  },
  topspaceminviewthree: {
    position: 'relative',
    top: SH(110),
    width: '90%',
  },
  dotstyletwo: {
    width: SW(15),
    height: SH(15),
    borderWidth: SW(2),
    border_color: Colors.light_gray_text_color,
    borderRadius: SW(100),

  },
  TrackOrderStyleet: {
    flexDirection: 'row',
    backgroundColor: Colors.white_text_color,
    paddingTop: SH(20),
    borderRadius: SH(10),
    paddingBottom: SH(50),
    paddingHorizontal: SH(20)
  },
  PostionAbsoluteView: {
    backgroundColor: Colors.theme_background,
    width: '100%',
    bottom: SH(0),
    paddingVertical: SH(20),
    paddingHorizontal: SH(20),
    borderTopLeftRadius: SH(10),
    borderTopRightRadius: SH(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  ImageStyle: {
    width: SW(60),
    height: SW(60),
    borderRadius: 200,
  },
  TextStyles: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    height: 23
  },
  TextStylesTwo: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    opacity: 0.7,
    height: 23
  },
  TextStylesThree: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    opacity: 0.7,
    height: 23
  },
  PaddingLeftReview: {
    paddingLeft: SH(20)
  },
  FlexrowsetOrderIDvIEW: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: SH(20),
    paddingVertical: SH(5),
    borderRadius: SH(10),
    borderWidth:1,
    borderColor:Colors.theme_background,
  },
  EstimatedTime: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17)
  },
  EstimatedTimeTwo: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17)
  }
});
