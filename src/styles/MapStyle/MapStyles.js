import { StyleSheet, } from 'react-native';
import { Fonts, SH, SW, SF } from '../../utils';

export default MapStyles = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    height: SW(300),
    width: SW(300),
    position: 'absolute'
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  roundedImage: {
    width: SW(100), // Adjust the width and height as needed
    height: SW(100),
    borderRadius: 50, // To make the image round
    marginBottom: SH(20),
  },
  MapViewFirst: {
    position: 'absolute',
    zIndex: 2,
    width: SW(230),
    height: SW(230),
    borderRadius: 400,
    backgroundColor: '#fcd4cf',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7
  },
  MapViewSecond: {
    position: 'absolute',
    zIndex: 3,
    width: SW(180),
    height: SW(180),
    borderRadius: 400,
    backgroundColor: '#fcb1b9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7
  },
  PostionAboluteMin: {
    position: 'absolute',
    width: SW(180),
    height: SW(180),
    zIndex: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  positonabsolute: {
    backgroundColor: Colors.white_text_color,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SW(27),
    borderTopRightRadius: SW(27),
    borderWidth: 1,
    borderColor: Colors.theme_background,
    borderBottomWidth: 0,
  },
  setpencileicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: SH(10),
    position: 'relative',
    top: SH(20),
    width: SW(50),
    height: SH(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: SW(0),
    marginTop: SH(-20),
    zIndex: 3,
  },
  ImageStyles: {
    width: SW(55),
    height: SW(55),
    position: 'absolute',
    zIndex: 123,
    borderRadius: 200,
    top: SH(-20),
  },
  ImageStylesTwo: {
    width: SW(55),
    height: SW(55),
    position: 'absolute',
    zIndex: 123,
    borderRadius: 200,
    bottom: SH(-20),
  },
  ImageStylesTw3: {
    width: SW(55),
    height: SW(55),
    position: 'absolute',
    zIndex: 123,
    borderRadius: 200,
    left: SH(-20),
  },
  ImageStylesTw4: {
    width: SW(55),
    height: SW(55),
    position: 'absolute',
    zIndex: 123,
    borderRadius: 200,
    right: SH(-20),
  },
  CenterImage: {
    width: SW(55),
    height: SW(55),
    borderRadius: 200
  },
  BottomViewPostion: {
    backgroundColor: Colors.theme_background,
    width: '90%',
    position: 'absolute',
    bottom: SH(90),
    paddingHorizontal: SH(20),
    paddingVertical: SH(15),
    borderRadius: 10
  },
  FlexRowPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  FlexRowTextWidthIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LocationTextStyle: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    paddingLeft: SH(20),
    width: '85%'
  },
  LocationTextStyleTwo: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    width: '85%'
  },
  minstyleviewphotograpgys: {
    backgroundColor: Colors.theme_background_Second,
    height: '100%',
    width: '100%'
  },
  mainvieweditlocation: {
    width: '100%',
    height: 'auto',
  },
  minflexview: {
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 15,
    paddingTop: 10,
  },
  locationsurchinputshadow: {
    backgroundColor: Colors.white_text_color,
    width: '100%',
    height: SH(58),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 25,
    marginTop: SH(10),
    shadowColor: Colors.black_text_color,
    paddingLeft: 12,
    paddingRight: 15,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 0 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 0 : 25,
    elevation: Platform.OS === 'ios' ? 0 : 3,
  },
  inputtextstylelocation: {
    color: Colors.black_text_color,
    fontSize: SF(16),
    fontWeight: '600',
    fontFamily: Fonts.Metropolis_Medium,
    width: SW(270),
    marginLeft: 10,
  },
  flexrowsetlocationmap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  setmarginleftgps: {
    marginLeft: 15,
  },
  cureentlocationtext: {
    color: Colors.theme_background,
    fontFamily: Fonts.Metropolis_Medium,
    fontSize: SF(17),
    fontWeight: '700',
  },
  usingtextlocation: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Metropolis_Medium,
    fontSize: SF(13),
  },
  flexrowhomeimage: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  marginright: {
    marginRight: 20,
  },
  satyanilaym: {
    color: Colors.black_text_color,
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
    width: '90%'
  },
  satyanilaymtwo: {
    color: Colors.black_text_color,
    fontSize: SF(13),
    width: '99%',
    fontFamily: Fonts.Poppins_Medium,
  },
  AbsoluteButton: {
    position: 'absolute',
    bottom: SH(20),
    width: '90%'
  },
  setwhiteboxwidth: {
    width: '85%',
    paddingBottom: SH(10),
  },
  centerpencileicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});
