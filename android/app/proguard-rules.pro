# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# RootBeer rule: keep native methods and JNI calls
-keep class com.scottyab.rootbeer.RootBeer {
    public *;
}
-keep class com.scottyab.rootbeer.util.QLog {
    public *;
}

# Keep your custom Java Native Module classes from being stripped/renamed
-keep class com.surveyapp.RootDetectionModule { *; }
-keep class com.surveyapp.RootDetectionPackage { *; }

# Keep React Native bridge classes
-keepclassmembers class * extends com.facebook.react.bridge.ReactContextBaseJavaModule {
    @com.facebook.react.bridge.ReactMethod <methods>;
}