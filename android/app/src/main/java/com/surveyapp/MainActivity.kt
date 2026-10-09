package com.surveyapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)

        // Perform emulator detection check
        if (EmulatorDetector.isEmulator(this)) {
            handleEmulatorDetected()
        } else {
            // Normal application startup
            Toast.makeText(this, "Device validated: Running on genuine hardware.", Toast.LENGTH_SHORT).show()
        }
    }

    /**
     * Handles security enforcement when an emulator environment is detected.
     */
    private fun handleEmulatorDetected() {
        AlertDialog.Builder(this)
            .setTitle("Security Warning")
            .setMessage("This application cannot run inside an emulator or virtualized environment for security reasons.")
            .setCancelable(false)
            .setPositiveButton("Exit") { _, _ ->
                finishAffinity() // Close the application completely
            }
            .show()
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "SurveyApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
