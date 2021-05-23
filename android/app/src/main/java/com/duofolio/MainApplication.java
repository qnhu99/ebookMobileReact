package com.duofolio;

import android.content.Context;
import android.webkit.WebView;
import androidx.multidex.MultiDexApplication;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import net.no_mad.tts.TextToSpeechPackage;
import ui.fileselector.RNFileSelectorPackage;

public class MainApplication
  extends MultiDexApplication
  implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      //packages.add(new RNFileSelectorPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    WebView.setWebContentsDebuggingEnabled(true);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
    Context context,
    ReactInstanceManager reactInstanceManager
  ) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.duofolio.ReactNativeFlipper");
        aClass
          .getMethod(
            "initializeFlipper",
            Context.class,
            ReactInstanceManager.class
          )
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
