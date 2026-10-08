package com.surveyapp
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.scottyab.rootbeer.RootBeer

class RootDetectionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RootDetection"
    }

    @ReactMethod
    fun isDeviceRooted(promise: Promise) {
        try {
            val rootBeer = RootBeer(reactApplicationContext)
            // combines common root checks (su binary, test-keys, dangerous props, etc.)
            val isRooted = rootBeer.isRooted
            promise.resolve(isRooted)
        } catch (e: Exception) {
            promise.reject("ROOT_CHECK_ERROR", e.message, e)
        }
    }
}