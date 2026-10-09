package com.surveyapp
import android.content.Context
import android.os.Build
import android.telephony.TelephonyManager
import java.io.File
import java.util.Locale

object EmulatorDetector {
    /**
     * Main check combining all heuristics.
     * Returns true if any of the checks indicate an emulator environment.
     */
    fun isEmulator(context: Context): Boolean {
        return checkBuildProps() ||
                checkEmulatorFiles() ||
                checkTelephony(context) ||
                checkCpuArchitecture()
    }
    /**
     * Checks Android Build constants for common QEMU, AVD, and Genymotion signatures.
     */
    private fun checkBuildProps(): Boolean {
        val brand = Build.BRAND.lowercase(Locale.ROOT)
        val device = Build.DEVICE.lowercase(Locale.ROOT)
        val fingerprint = Build.FINGERPRINT.lowercase(Locale.ROOT)
        val hardware = Build.HARDWARE.lowercase(Locale.ROOT)
        val manufacturer = Build.MANUFACTURER.lowercase(Locale.ROOT)
        val model = Build.MODEL.lowercase(Locale.ROOT)
        val product = Build.PRODUCT.lowercase(Locale.ROOT)
        val board = Build.BOARD.lowercase(Locale.ROOT)
        val host = Build.HOST.lowercase(Locale.ROOT)

        return (fingerprint.startsWith("generic") || fingerprint.startsWith("unknown")) ||
                model.contains("google_sdk") ||
                model.contains("emulator") ||
                model.contains("android sdk built for x86") ||
                manufacturer.contains("genymotion") ||
                hardware.contains("goldfish") ||
                hardware.contains("ranchu") ||
                (brand.startsWith("generic") && device.startsWith("generic")) ||
                product == "google_sdk" ||
                product.contains("sdk") ||
                product.contains("sdk_x86") ||
                product.contains("vbox86p") ||
                product.contains("emulator") ||
                product.contains("simulator") ||
                board.contains("unknown") ||
                host.startsWith("build") // Common in headless CI/CD emulator instances
    }

    /**
     * Checks for known QEMU virtual drivers and debug files.
     */
    private fun checkEmulatorFiles(): Boolean {
        val knownFiles = arrayOf(
            "/dev/socket/qemud",
            "/dev/qemu_pipe",
            "/system/lib/libc_malloc_debug_qemu.so",
            "/system/lib64/libc_malloc_debug_qemu.so",
            "/sys/qemu_trace",
            "/system/bin/qemu-props"
        )

        return knownFiles.any { path -> File(path).exists() }
    }
    /**
     * Inspects telephony network carrier state, which usually defaults to "Android" or null on emulators.
     */
    private fun checkTelephony(context: Context): Boolean {
        val tm = context.getSystemService(Context.TELEPHONY_SERVICE) as? TelephonyManager
            ?: return false

        val networkOperatorName = tm.networkOperatorName
        return "android".equals(networkOperatorName, ignoreCase = true)
    }

    /**
     * Checks if the device's primary ABI is x86 or x86_64, common for desktop-hosted emulators.
     */
    private fun checkCpuArchitecture(): Boolean {
        if (Build.SUPPORTED_ABIS.isNotEmpty()) {
            val primaryAbi = Build.SUPPORTED_ABIS[0].lowercase(Locale.ROOT)
            return primaryAbi.contains("x86") || primaryAbi.contains("x86_64")
        }
        return false
    }
}