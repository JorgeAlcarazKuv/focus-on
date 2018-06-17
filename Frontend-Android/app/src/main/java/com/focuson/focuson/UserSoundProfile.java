package com.focuson.focuson;

import android.content.Intent;
import android.content.res.Resources;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.AppCompatImageView;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;

import com.focuson.focuson.entities.Audio;
import com.focuson.focuson.entities.Profiles;
import com.focuson.focuson.entities.User;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class UserSoundProfile extends AppCompatActivity {

    public final String[] AUDIONAMELIST = {"Rain", "Storm", "Wind", "Sea", "Garden", "Night", "River", "Fire"};

    private Spinner spinner;
    private LinearLayout linearProfile;
    private ImageButton backButton;

    private String username;

    private int selectedList = 0;

    private User user;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_sound_profile);

        spinner = findViewById(R.id.spinner);
        linearProfile = findViewById(R.id.linearProfile);
        backButton = findViewById(R.id.backButton);


        //Gets the username out of the intent.
        Intent intent = getIntent();
        username = intent.getStringExtra("username");
        Log.i("ACTIVITY USER SOUND", username);

        //Looks for the node from which the info will be extracted
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference myRef = database.getReference().child(username).child("profiles");

        /**
         * Current User data retrieval
         */
        myRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                updateData(dataSnapshot);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        /**
         * Updates the selected audio list from the spinner.
         */
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                for (Profiles selectedProfile : user.getProfiles()) {
                    selectedList = position;
                    if (selectedProfile.getProfileName().equals(spinner.getSelectedItem())) {
                        ((TextView) spinner.getSelectedView()).setTextColor(getResources().getColor(R.color.grey));
                        ((TextView) spinner.getSelectedView()).setTextSize(30);
                        generateListView(selectedProfile);
                    }
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentBack = new Intent(getApplicationContext(),MainActivity.class);
                startActivity(intentBack);
                finish();
            }
        });
    }

    /**
     * Updates the profiles spinner
     *
     * @param
     */
    private void updateSpinner(List<String> list) {
        Log.i(" updateSpinner", "updateSpinner");
        ArrayAdapter<String> adapter = new ArrayAdapter<>(getApplicationContext(),
                android.R.layout.simple_spinner_item, list);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setSelection(selectedList);
    }


    /**
     *  Gets the list of profiles and loads them in the view
     * @param user
     * @return
     */
    private List<String> getStringListFromProfiles(User user) {
        List<String> profilesList = new ArrayList<>();
        for (Profiles profile : user.getProfiles()) {
            profilesList.add(profile.getProfileName());
        }

        return profilesList;
    }

    /**
     *  Creates the visual structure and entablish the relationships between the elements and its respective values in database.
     * @param profiles
     */
    private void generateListView(Profiles profiles) {
        linearProfile.removeAllViews();
        Audio audio;
        for (int i = 0; i < this.AUDIONAMELIST.length; i++) {
            switch (i) {
                case 0:
                    audio = profiles.getRainAudio();
                    break;
                case 1:
                    audio = profiles.getStormAudio();
                    break;
                case 2:
                    audio = profiles.getWindAudio();
                    break;
                case 3:
                    audio = profiles.getSeaAudio();
                    break;
                case 4:
                    audio = profiles.getGardenAudio();
                    break;
                case 5:
                    audio = profiles.getNightAudio();
                    break;
                case 6:
                    audio = profiles.getRiverAudio();
                    break;
                case 7:
                    audio = profiles.getFireAudio();
                    break;
                default:
                    audio = null;
                    break;
            }
            //Estructura general
            if (audio != null) {
                final Button button = new Button(this);
                final SeekBar seek = new SeekBar(this);
                final AppCompatImageView iconSound = new AppCompatImageView(this);
                LinearLayout horizontalLayout = new LinearLayout(getApplicationContext());
                horizontalLayout.setOrientation(LinearLayout.HORIZONTAL);
                horizontalLayout.addView(button);

                horizontalLayout.addView(iconSound);
                horizontalLayout.addView(seek);
                horizontalLayout.setPadding(20,20,20,40);
                linearProfile.addView(horizontalLayout);
                //Datos y tamaños
                button.setText(this.AUDIONAMELIST[i]);
                seek.setProgress((int) (audio.getAudioVolume() * 100));
                seek.incrementProgressBy(1);
                seek.setMax(100);
                seek.setPadding(50, 20, 130, 20);
                ViewGroup.LayoutParams seekParams = seek.getLayoutParams();
                seekParams.width = 550;
                seekParams.height = 100;

                final Audio changeAudio = audio;
                if(audio.getIsPlaying()) {
                    iconSound.setImageResource(R.mipmap.volume_down_white_36x36);
                }else{
                    iconSound.setImageResource(R.mipmap.volume_off_white_36x36);
                }
                /**
                 * Actualiza el valor de volumen del audio en la base de datos cuando se deja de pulsar la seekbar
                 */
                seek.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
                    @Override
                    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

                    }

                    @Override
                    public void onStartTrackingTouch(SeekBar seekBar) {

                    }

                    @Override
                    public void onStopTrackingTouch(SeekBar seekBar) {
                        changeAudio.setAudioVolume(seekBar.getProgress() / 100.00);
                        updateDatabase();
                    }
                });

                /**
                 *
                 */
                button.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        changeAudio.setIsPlaying(!changeAudio.getIsPlaying());
                        if (changeAudio.getIsPlaying()) {
                            iconSound.setImageResource(R.mipmap.volume_down_white_36x36);
                        } else {
                            iconSound.setImageResource(R.mipmap.volume_off_white_36x36);
                        }
                        updateDatabase();
                    }
                });
            }
        }

    }

    /**
     *  Updates the shown info based on DB data.
     * @param dataSnapshot
     */
    private void updateData(DataSnapshot dataSnapshot) {
        List<Profiles> tempList = new ArrayList<>();
        for (DataSnapshot tempProfile : dataSnapshot.getChildren()) {
            Profiles profile = tempProfile.getValue(Profiles.class);
            tempList.add(profile);
        }
        user = new User(tempList);
        updateSpinner(getStringListFromProfiles(user));
    }

    /**
     * Pushes data to DB based on app changes.
     */
    private void updateDatabase() {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference myRef = database.getReference();
        myRef.child(username).setValue(user);
    }

}
