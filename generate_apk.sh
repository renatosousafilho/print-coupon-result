ionic cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore nacional.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk nacional
rm ~/nacional.apk
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk ~/nacional.apk
