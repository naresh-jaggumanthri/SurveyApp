import { StyleSheet } from 'react-native';
import { SF, Fonts, SW, SH } from '../../utils';

export default HomeTabStyle = (Colors) => StyleSheet.create({
  BackGroundLeft: {
    position: 'absolute',
    width: SW(120),
    height: SW(120),
    borderRadius: 300,
    backgroundColor: Colors.theme_background_Second,
    left: SH(-70),
    top: SH(-40)
  },
  BackGroundRight: {
    position: 'absolute',
    width: SW(120),
    height: SW(120),
    borderRadius: 300,
    backgroundColor: Colors.theme_background_Second,
    right: SH(-70),
    top: SH(-40)
  },
  MyDashBoardText: {
    color: Colors.black_text_color,
    fontWeight: '700',
    fontSize: SF(25),
    textAlign: 'center'
  },
  FlexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: SH(35),
    backgroundColor: Colors.white_text_color,
    borderRadius: 300,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.theme_background
  },
  WhiteBackground: {
    backgroundColor: Colors.theme_background,
    height: SH(35),
    width: '33.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  WhiteBackgroundTwo: {
    backgroundColor: Colors.white_text_color,
    height: SH(35),
    width: '33.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.theme_background
  },
  MenuTextStyle: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(16)
  },
  MenuTextStyleTwo: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(16)
  },
  PieChartView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BackGroundShape: {
    backgroundColor: Colors.theme_background_Second,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SH(10)
  },
  RecentlyTextStyle: {
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    fontWeight: '700',

  },
  ViewAllTextStyle: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
  },
  FlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: SH(20),
    paddingLeft: SH(20)
  },
  Eventlistview: {
    width: '100%',
    padding: SH(7),
    paddingBottom: SH(0),
    marginBottom: SH(10),
    flexDirection: 'row',
    borderWidth: SH(0.5),
    backgroundColor: Colors.white_text_color,
    borderColor: Colors.light_gray_text_color,
    borderRadius: SH(10),
  },
  EventlistviewTwo: {
    width: '100%',
    padding: SH(7),
    paddingBottom: SH(0),
    marginBottom: SH(10),
    flexDirection: 'row',
    borderWidth: SH(0.5),
    backgroundColor: Colors.white_text_color,
    borderColor: Colors.light_gray_text_color,
    borderRadius: SH(10),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Flexrowbox: {
    flexDirection: 'row',
  },
  Setimagestyles: {
    width: SW(95),
    height: SH(95),
    borderRadius: SH(10),
  },
  Widthstylestwo: {
    width: '67%',
  },
  Textstylesbastu: {
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.theme_background,
  },
  Flexrowmusiz: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  Musicborderview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SH(100),
    marginRight: SH(10),
    color: Colors.theme_background,
    borderColor: Colors.theme_background,
  },
  Musictextstryles: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(13),
    color: Colors.gray_text_color,
  },
  watchingflexviewstyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  Peopletextstyle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(10),
    color: Colors.black_text_color,
  },
  Flexviewtwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Flexrowstyles: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(200),
  },
  Mapstylesadrresh: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(14),
    marginLeft: SH(10),
    color: Colors.black_text_color,
    opacity: 0.8,
  },
  Flexrowsettwobutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: SH(1),
    borderStyle: 'dashed',
    paddingVertical: SH(7),
    paddingHorizontal: SH(10),
    borderTopColor: Colors.gray_text_color
  },
  Twodiifrentbtn: {
    width: '48%',
    height: SH(40),
    paddingVertical: SH(0)
  },
  Revieewsbutton: {
    width: '55%',
    height: SH(30),
    padding: 0,
    borderWidth: SH(0),
    borderColor: Colors.theme_background,
    backgroundColor: Colors.theme_background,
  },
  RevieewsbuttonTextstyles: {
    color: Colors.white_text_color,
    fontSize: SF(13),
  },
  Widthstyles: {
    width: '33%',
  },
  FlexRowSet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  BackGroundView: {
    backgroundColor: Colors.theme_background_Second,
    width: SW(40),
    height: SW(40),
    borderRadius: 300,
    right: SH(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BackGroundViewTwo: {
    backgroundColor: Colors.theme_background_Second,
    width: SW(40),
    height: SW(40),
    borderRadius: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextViewWidth: {
    width: '90%',
  },
  PostionAbsolute: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 435
  },
  LoginImage: {
    width: '100%',
    height: SH(100),
  },
  LoginImageTwo: {
    width: '100%',
    height: '100%'
  },
  LogIntoAccount: {
    position: 'absolute',
    top: SH(10),
    flexDirection: 'row',
    alignItems: 'center',
    left: SH(20)
  },
  LoginText: {
    fontSize: SF(32),
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_BoldItalic,
    paddingLeft: SH(20),
    top:SH(5)
  },
  BlackResponce: {
    color:Colors.black_text_color,
    fontFamily:Fonts.Poppins_Medium,
    fontSize:SF(18)
  },
  BlackResponceOne: {
    color:Colors.green_color,
    fontFamily:Fonts.Poppins_Medium,
    fontSize:SF(18),
    fontWeight:'700'
  },
  FlexRowDirection: {
    flexDirection:'row',
    alignItems:'center',
  }
});