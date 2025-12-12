import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH, SW, widthPercent } from '../../utils';

export default StyleSheet.create({
  WhiteNotifoication: {
    backgroundColor: Colors.white_text_color,
    width: '95%',
    paddingTop: SH(0),
    borderRadius: SH(10),
    paddingHorizontal: SH(10),
    marginHorizontal: SH(7),
    borderWidth:0.5,
    borderColor:Colors.theme_background
  },
  FlexRowTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.5,
    paddingVertical: SH(10),
    borderBottomColor: Colors.light_gray_text_color
  },
  BlututhIconView: {
    backgroundColor: Colors.Settings_Colors_1,
    width: SW(35),
    height: SW(35),
    borderRadius: SH(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BlututhIconView2: {
    backgroundColor: Colors.Settings_Colors_2,
    width: SW(35),
    height: SW(35),
    borderRadius: SH(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BlututhIconView3: {
    backgroundColor: Colors.Settings_Colors_3,
    width: SW(35),
    height: SW(35),
    borderRadius: SH(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BlututhIconView4: {
    backgroundColor: Colors.black_text_color,
    width: SW(35),
    height: SW(35),
    borderRadius: SH(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BlututhTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%'
  },
  BlututhTextViewTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%'
  },
  BlututhText: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    paddingLeft: SH(15)
  },
  BlututhTextSmall: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(12),
    paddingLeft: SH(15)
  },
  SwithWidthVieww: {
    width: '20%'
  },
  LanguAgeView: {
    borderWidth: 1,
    width: widthPercent(60),
    flexDirection: 'row',
    height: SH(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: SH(15),
    borderColor: Colors.theme_background,
    left: SH(17),
  },
});