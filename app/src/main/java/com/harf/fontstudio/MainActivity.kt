package com.harf.fontstudio

import android.annotation.SuppressLint
import android.content.ContentValues
import android.content.Context
import android.media.MediaScannerConnection
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.io.File
import java.io.FileOutputStream

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState: Bundle?)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        
        // Configure WebView settings for offline HTML5 application
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.databaseEnabled = true
        webView.settings.useWideViewPort = true
        webView.settings.loadWithOverviewMode = true

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false // load links inside the WebView itself
            }
        }

        // Add Java-JS Bridge interface
        webView.addJavascriptInterface(WebAppInterface(this), "AndroidBridge")

        // Load the local HTML5 site from native assets
        webView.loadUrl("file:///android_asset/index.html")
    }

    // Handle back button for web history navigation
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    // Bridge interface to capture file data URL and save to Gallery
    inner class WebAppInterface(private val context: Context) {
        @JavascriptInterface
        fun downloadImage(base64Str: String) {
            runOnUiThread {
                saveImageToGallery(base64Str)
            }
        }
    }

    private fun saveImageToGallery(base64Str: String) {
        try {
            val pureBase64 = base64Str.substringAfter("base64,")
            val imageBytes = Base64.decode(pureBase64, Base64.DEFAULT)
            val filename = "HarfCalligraphy-${System.currentTimeMillis()}.png"

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                // MediaStore API (No permission needed on Android 10+)
                val resolver = contentResolver
                val contentValues = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, filename)
                    put(MediaStore.MediaColumns.MIME_TYPE, "image/png")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/HarfStudio")
                }
                val imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
                if (imageUri != null) {
                    resolver.openOutputStream(imageUri).use { out ->
                        out?.write(imageBytes)
                    }
                    Toast.makeText(this, "Calligraphy saved to Gallery!", Toast.LENGTH_LONG).show()
                }
            } else {
                // Older Android (requires WRITE_EXTERNAL_STORAGE declared in manifest)
                val imagesDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).toString() + "/HarfStudio"
                val dir = File(imagesDir)
                if (!dir.exists()) dir.mkdirs()
                val imageFile = File(dir, filename)
                FileOutputStream(imageFile).use { out ->
                    out.write(imageBytes)
                }
                // Notify gallery scanner to refresh
                MediaScannerConnection.scanFile(this, arrayOf(imageFile.toString()), null, null)
                Toast.makeText(this, "Calligraphy saved to Pictures/HarfStudio!", Toast.LENGTH_LONG).show()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "Failed to save card: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }
}
