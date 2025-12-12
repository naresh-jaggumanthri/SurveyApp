import { Fonts, SH, SW, SF, widthPercent, Colors } from '../../utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    height: 'auto'
  },
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  bgcolorset: {
    backgroundColor: Colors.theme_background
  },
  minviewsigninscreen: {
    width: '100%',
    height: '100%',
  },
  minflexview: {
    width: '100%',
    height: '100%',
  },
  settingtext: {
    color: Colors.theme_background,
    fontWeight: '700',
    fontSize: SF(21),
    fontFamily: Fonts.Poppins_Medium,
  },
  yoreorderstylebox: {
    backgroundColor: Colors.white_text_color,
    color: Colors.black_text_color,
    width: '95%',
    borderRadius: SW(10),
    paddingTop: SH(17),
    marginLeft: SW(8),
    marginBottom: SH(20),
    paddingBottom: SH(20),
  },
  imagesetus: {
    height: SH(50),
    width: SW(50),
    borderRadius: SW(5),
    marginRight: SW(10),
  },
  vadapavtextstyeleset: {
    color: Colors.black_text_color,
    fontSize: SF(17),
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Medium,
  },
  PriceTextStyle: {
    color: Colors.theme_background,
    fontSize: SF(20),
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Bold,
  },
  addreshrtext: {
    color: Colors.gray_text_color,
    fontSize: SF(13),
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Medium,
  },
  flexrowsettext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexminviewset: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SW(12),
    paddingRight: SW(15),
  },
  priceflextext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '79%'
  },
  ImageViewWidtgh: {
    width: '30%',
    height: SH(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: SH(5),
    borderStyle: 'dashed',
    marginRight: SH(17),
    borderColor: Colors.theme_background,
  },
  borderbottomview: {
    borderBottomColor: Colors.light_gray_text_color,
    borderBottomWidth: SW(1),
    paddingBottom: SH(14),
    marginBottom: SH(10),
  },
  borderbottomviewtwo: {
    borderBottomColor: Colors.light_gray_text_color,
    borderBottomWidth: SW(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: SH(15),
    justifyContent: 'space-between',
  },
  setlistdataitems: {
    paddingLeft: SW(15),
    paddingBottom: SH(8),
  },
  setitemstext: {
    color: Colors.gray_text_color,
    fontSize: SF(14),
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Medium,
  },
  blacktitle: {
    color: Colors.black_text_color,
    fontSize: SF(14),
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Medium,
  },
  setwidth70: {
    width: '70%'
  },
  rejectedtextstyle: {
    fontSize: SF(17),
    fontWeight: '700',
    color: Colors.green_color,
    fontFamily: Fonts.Poppins_Medium,
    paddingLeft: SW(10),
  },
  rejectedtextRedstyle: {
    fontSize: SF(17),
    fontWeight: '700',
    color: Colors.red,
    fontFamily: Fonts.Poppins_Medium,
    paddingLeft: SW(10),
  },
  rigthdeliveredicon: {
    color: Colors.red,
  },
  setflexitemview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexrowsettextrejected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: SW(15),
    paddingLeft: SW(5),
    paddingTop: SH(18),
  },
  paddingtopset: {
    paddingTop: SH(20),
  },
  flexreowdilevry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SW(10),
  },
  yourorderdata: {
    height: SH(65),
    width: SW(100),
    borderRadius: SW(5),
    marginRight: SW(10),

  },
  LinerStyle: {
    height: SW(70),
    width: SW(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});