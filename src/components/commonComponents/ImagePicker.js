import React, { useMemo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { SH, SW,SF, Colors } from '../../utils';
import IconF from 'react-native-vector-icons/FontAwesome';
import { AnalyaticsStyle } from '../../styles';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '@react-navigation/native';
import images from '../../index';
import { VectorIcon } from '../../components';

function ImgPicker(props) {
    const { showdatatwo,showDataThree, showdata, userimagstyle, text,imageData,setImageData,onPress,imgpathselect,SetImgpathselect} = props;
   
    const [filePath, setFilePath] = useState('');
    
    const [AlertData, setAlertData] = useState(false);
    const { Colors } = useTheme();
    const AnalyaticsStyles = useMemo(() => AnalyaticsStyle(Colors), [Colors]);
    const Styles = useMemo(
        () =>
            StyleSheet.create({
                userimagstyle: {
                    height: SH(70),
                    width: SW(70),
                    overflow: 'hidden',
                    borderRadius: 10,
                    alignSelf: "center",
                },
                userimagstyletwo: {
                    height: SH(70),
                    width: SW(70),
                    borderRadius: 10,
                },
                borderroundimage: {
                    position: 'relative',
                    width: SW(153),
                    height: SH(153)
                },
                mainView: {
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "baseline",
                },
                Setwidthminview: {
                    width: '100%'
                }
            }),
        [],
    );
    const pickFromGallery = () => {
        // let options = {
        //     mediaType: 'photo',
        //     cropping: true,
        //     includeBase64:true,
        //     saveToPhotos: true,
        //     maxWidth: 200,
        //     maxHeight: 200,
        //     quality: 10,
        //     allowsEditing: true,
        // };
         let options = {
    title: 'Select Image',
    type: 'library',
    selectionLimit: 0,
      mediaType: 'photo',
      includeBase64:false,
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64:false,
    //   includeExtra,
    },
};
        launchImageLibrary(options, (response) => {
            // console.log(response, '=====>')
            //   Alert.alert("response23",JSON.stringify(response));
            // if (response?.didCancel) {
            //     setAlertData(current => !current)
            //     return;
            // }
            // setFilePath(response.assets[0].base64);
            setImageData(response?.assets[0]);
            SetImgpathselect(response?.assets[0]?.uri);


        });
    //     launchCamera(options,(response)=>{
    //         if (response.didCancel) {
    //   console.log('User cancelled image picker');
    // } else if (response.error) {
    //   console.log('Image picker error: ', response.error);
    // } else {
    //   let imageUri = response.uri || response.assets?.[0]?.uri;
    //   SetImgpathselect(imageUri);
    // }

    //     });
    };
     const pickFromCamera = () => {
        let options={
    title: 'Take Image',
    type: 'capture',
     includeBase64: true,
     mediaType: 'photo',
     saveToPhotos: true,
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64:true,
    //   includeExtra,
    },
  };
//    { mediaType: 'photo', quality: 0.7, saveToPhotos: true }
    launchCamera(options,(response) => {
        if (response.didCancel || response.errorCode) return;

      

        const asset = response?.assets[0];
        // onChange({
        //   uri: asset.uri,
        //   type: asset.type,
        //   name: asset.fileName || `photo_${Date.now()}.jpg`,
        // });
       
          setImageData(response?.assets[0]);
        SetImgpathselect(asset?.originalPath);
      }
    );
  };
    const chooseFile = () => {
    Alert.alert('Select Image', 'Choose source', [
      { text: 'Camera', onPress: pickFromCamera },
      { text: 'Gallery', onPress: pickFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
    return (
        <View style={Styles.mainView}>
            {showdata &&
                <TouchableOpacity>
                    {imgpathselect ?
                        <TouchableOpacity onPress={() => chooseFile()}>
                            <Image style={[Styles.userimagstyle, { ...userimagstyle }]} resizeMode="cover" source={{ uri: imgpathselect }} />
                        </TouchableOpacity>
                        :
                        <View>
                            <TouchableOpacity onPress={() => chooseFile()}>
                                <Image source={images.NO_Image_Camera} tintColor={Colors.gray_text_color} style={AnalyaticsStyles.CaptureImageSet} />
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
            }
            {showdatatwo &&
                <TouchableOpacity onPress={() => chooseFile()}>
                    {imgpathselect ?
                        <TouchableOpacity onPress={() => chooseFile()}>
                            <Image style={[Styles.userimagstyletwo, { ...userimagstyle }]} resizeMode="cover" source={{ uri: imgpathselect }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => chooseFile()} style={AnalyaticsStyles.iCOPNCENTER}>
                            <VectorIcon icon="Entypo" name="folder-video" size={SF(70)} color={Colors.gray_text_color} />
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
            }
             {showDataThree &&
                <TouchableOpacity>
                    {imgpathselect ?
                        <TouchableOpacity onPress={() => chooseFile()}>
                            <Image style={[Styles.userimagstyle, { ...userimagstyle }]} resizeMode="cover" source={{ uri: imgpathselect }} />
                        </TouchableOpacity>
                        :
                        <View>
                            <TouchableOpacity onPress={() => chooseFile()}>
                            <Image source={images.Survey_Image_Three} style={AnalyaticsStyles.CaptureImageSet} />
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
            }
        </View>
    );
}

ImgPicker.defaultProps = {
    userImage: '',
    noImageType: '',
    onPress: () => { }
};

ImgPicker.propTypes = {
    userImage: PropTypes.string,
    noImageType: PropTypes.string,
    onPress: PropTypes.func,
};

export default ImgPicker;
