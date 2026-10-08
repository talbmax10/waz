# WAZ Android

WAZ is packaged for Android with Capacitor.

Build:
```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

GitHub Actions builds the APK automatically on every main push and manual dispatch.
