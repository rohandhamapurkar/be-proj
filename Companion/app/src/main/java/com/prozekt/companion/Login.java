package com.prozekt.companion;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import com.wang.avi.AVLoadingIndicatorView;
import org.json.JSONException;
import org.json.JSONObject;

public class Login extends AppCompatActivity{

    public static final String CRED = "ACCDETAILS";
    private AVLoadingIndicatorView avi;
    private EditText username;
    private EditText password;
    private Context ctx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        String indicator=getIntent().getStringExtra("indicator");
        avi= (AVLoadingIndicatorView) findViewById(R.id.avi);
        avi.setIndicator(indicator);
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
                avi.show();
                getWindow().setFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                        WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
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
                                avi.hide();
                                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
                            } else {
                                dialog.show();
                                avi.hide();
                                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
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
