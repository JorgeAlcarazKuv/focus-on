package com.focuson.focuson;

import android.Manifest;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import github.nisrulz.qreader.QRDataListener;
import github.nisrulz.qreader.QREader;

public class MainActivity extends AppCompatActivity {

    private static final String cameraPerm = Manifest.permission.CAMERA;
    boolean hasCameraPermission = false;

    private TextView text;

    private SurfaceView mySurfaceView;
    private QREader qrEader;

    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        hasCameraPermission = RuntimePermissionUtil.checkPermissonGranted(this, cameraPerm);

        text = findViewById(R.id.code_info);

        final Button stateBtn = findViewById(R.id.btn_start_stop);
        // change of reader state in dynamic
        stateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
              finish();
            }
        });

        stateBtn.setVisibility(View.VISIBLE);

        mySurfaceView = findViewById(R.id.camera_view);

        if (hasCameraPermission) {
            setupQREader();
        } else {
            RuntimePermissionUtil.requestPermission(MainActivity.this, cameraPerm, 100);
        }
    }

    private QRDataListener qrDataListener = new QRDataListener() {
        @Override
        // Executes upon detecting a valid QR code on camera.
        public void onDetected(final String data) {
            Log.d("QREader", "Value : " + data);
            text.post(new Runnable() {
                @Override
                public void run() {
                        byte[] decodedData = Base64.decode(data, Base64.DEFAULT);
                        String decodedText = null;
                        try {
                            decodedText = new String(decodedData, "UTF-8");
                            String[] comparison = decodedText.split("\\.");
                            if (comparison.length > 1 && comparison[1].equals("focuson")) {
                                Intent intent = new Intent(getApplicationContext(), UserSoundProfile.class);
                                intent.putExtra("username", comparison[0]);
                                startActivity(intent);
                                finish();
                            }
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }

                        text.setText(decodedText);

                }
            });
        }
    };

    void setupQREader() {
        // Init QREader
        // ------------
        qrEader = new QREader.Builder(this, mySurfaceView,qrDataListener).facing(QREader.BACK_CAM)
                .enableAutofocus(true)
                .height(mySurfaceView.getHeight())
                .width(mySurfaceView.getWidth())
                .build();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (hasCameraPermission) {

            // Cleanup in onPause()
            // --------------------
            qrEader.releaseAndCleanup();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (hasCameraPermission) {

            // Init and Start with SurfaceView
            // -------------------------------
            qrEader.initAndStart(mySurfaceView);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull final String[] permissions,
                                           @NonNull final int[] grantResults) {
        if (requestCode == 100) {
            RuntimePermissionUtil.onRequestPermissionsResult(grantResults, new RPResultListener() {
                @Override
                public void onPermissionGranted() {
                    if (RuntimePermissionUtil.checkPermissonGranted(MainActivity.this, cameraPerm)) {
                        startActivity(new Intent(MainActivity.this, MainActivity.class));
                        finish();
                    }
                }

                @Override
                public void onPermissionDenied() {
                    // do nothing
                }
            });
        }
    }
}
