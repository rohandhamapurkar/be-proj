package com.prozekt.companion;

import android.annotation.SuppressLint;
import android.graphics.drawable.Animatable;
import android.graphics.drawable.Drawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.widget.ImageView;

public class OTP extends AppCompatActivity {
    private String host = "http://192.168.1.220";
    private String port = "5000";
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_otp);
        setTitle("OTP Screen");

        WebView webView = findViewById(R.id.WebViewOtp);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE,null);
        //webView.loadUrl("http://exchangerpoint.com");
        webView.loadUrl(host+":"+port);

        ImageView imageView = (ImageView) findViewById(R.id.successCheck);
        Drawable drawable = imageView.getDrawable();
        if(drawable instanceof Animatable){
            ((Animatable)drawable).start();
        }
    }
}
