package com.prozekt.companion;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class setPIN extends AppCompatActivity {

    private EditText pinOne;
    private EditText pinTwo;
    private Context ctx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_set_pin);
        pinOne = findViewById(R.id.setPin);
        pinTwo = findViewById(R.id.confirmPin);
        Button button = findViewById(R.id.savePin);
        ctx = this;

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validate();
            }
        });
    }

    void validate() {
        View focusView = null;
        boolean cancel = false;
        final String pinone = pinOne.getText().toString();
        final String pintwo = pinTwo.getText().toString();
        pinOne.setError(null);
        pinTwo.setError(null);

        if (pinone.length() != 4 && pintwo.length()!=4) {
            cancel = true;
            pinOne.setError("PIN should be 4 digit only");
            focusView = pinOne;
        } else if (!pinone.equals(pintwo)) {
            cancel = true;
            pinOne.setError("The PIN do not match");
            focusView = pinTwo;
        } else {
            SharedPreferences sp = getSharedPreferences("PIN", Activity.MODE_PRIVATE);
            SharedPreferences.Editor editor = sp.edit();
            editor.putInt("pinValue", Integer.parseInt(pinone));
            editor.apply();
            Intent intent = new Intent(ctx, MainActivity.class);
            ctx.startActivity(intent);
        }
    }
    }
