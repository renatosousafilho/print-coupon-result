# alterar a URL no arquivo home.ts


# Gerar chave privada

keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

# Alterar config.xml
widget.id, name e description

# Personalizar o ícone e a splash page
gerar as novas imagens nas respectivas resoluções (icon: 1024x1024, splash: 2732x2732)
ionic cordova resources android --force

# Build do apk

ionic cordova build --release android

# Assinar o apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name

# Otimizar o apk

zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk
