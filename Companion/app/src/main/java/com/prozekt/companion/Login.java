package com.prozekt.companion;


import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONException;
import org.json.JSONObject;

public class Login extends AppCompatActivity{

    public static final String CRED = "ACCDETAILS";
    private EditText username;
    private EditText password;
    private Context ctx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        username = findViewById(R.id.username);
        password = findViewById(R.id.password);
        Button submit = findViewById(R.id.submitButton);
        ctx = this;

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage(R.string.dialog_message)
                .setTitle(R.string.dialog_title)
                .setPositiveButton("Okay", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        username.setText("");
                        password.setText("");
                    }
                });
        final AlertDialog dialog = builder.create();
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new loginApiRequest(username.getText().toString(), password.getText().toString(), new AsyncResponse() {
                    @Override
                    public void processFinish(String success) {
                        try {
                            JSONObject js = new JSONObject(success);
                            Boolean result = (Boolean) js.get("ok");
                            if (result) {
                                SharedPreferences settings = getSharedPreferences(CRED, 0);
                                SharedPreferences.Editor editor = settings.edit();
                                editor.putString("JWT", js.get("token").toString());
                                editor.apply();
                                Intent intent = new Intent(ctx, setPIN.class);
                                ctx.startActivity(intent);
                            } else {
                                dialog.show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }).execute();
            }
        });
    }
}
