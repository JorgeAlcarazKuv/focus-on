import { Injectable } from '@angular/core';
import { AudioProfile } from '../../modules/ambient/models/audio-profile';

import { AngularFireDatabase } from 'angularfire2/database';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { SessionService } from './session.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SoundPlayerService {
  public loadedProfile: AudioProfile;
  public loadedProfilesList: any[];

  public userLogged: User;

  public profileTitle: string;

  constructor(
    public fbService: AngularFireDatabase,
    private sessionService: SessionService,
    public router: Router
  ) {
    this.loadedProfile = new AudioProfile();

    // Services don't have lifecycle hooks, so we create our own ngOnInit.
    this.onInit();
  }

  userAudioProfilesSubs: Subscription;

  private onInit() {
    // Initialization of User info. It can be either an User object or NULL whether it is logged.
    this.userLogged = this.sessionService.getUser();

    this.userStateSubscription();

    if (this.userLogged) {
      this.userAudioProfilesSubscription();
    }
  }
  public createNewList() {
    const indexActualProfile = this.loadedProfilesList
      .map(profile => profile.profileName)
      .indexOf(this.loadedProfile.profileName);

    let newProfile;
    // If there is a profile selected, we take said profile to make the new one.
    if (this.loadedProfilesList[indexActualProfile]) {
      newProfile = JSON.parse(
        JSON.stringify(this.loadedProfilesList[indexActualProfile])
      );
      newProfile.profileName = 'Default' + this.loadedProfilesList.length;
    } else {
      // If no profile selected, we create a default one.
      newProfile = JSON.parse(
        `{"fireAudio":{"audioVolume":0.5,"fileName":"fire.mp3","isPlaying":false},"gardenAudio":
      {"audioVolume":0.5,"fileName":"garden.mp3","isPlaying":false},"nightAudio":
      {"audioVolume":0.5,"fileName":"night.mp3","isPlaying":false},"profileName":"Default${
        this.loadedProfilesList.length
      }","rainAudio":
      {"audioVolume":0.5,"fileName":"rain.mp3","isPlaying":false},"riverAudio":{"audioVolume":0.5,"fileName":
      "river.mp3","isPlaying":false},"seaAudio":{"audioVolume":0.5,"fileName":"sea.mp3","isPlaying":false},
      "stormAudio":{"audioVolume":0.5,"fileName":"storm.mp3","isPlaying":false},"windAudio":{"audioVolume":0.5,
      "fileName":"wind.mp3","isPlaying":false}}`
      );
    }

    this.loadedProfilesList.push(newProfile);

    const indexNewProfile = this.loadedProfilesList
      .map(profile => profile.profileName)
      .indexOf(newProfile.profileName);

    this.fbService
      .list(`/${this.userLogged.username}/profiles`)
      .update(indexNewProfile.toString(), newProfile);
  }

  public getUserAudioProfiles(): any {
    const path = `/${this.userLogged.username}/profiles`;
    return this.fbService
      .list(path)
      .valueChanges()
      .pipe(
        tap(list => {
          console.log('Lista de perfiles de audio actualizada: ', list);
        })
      );
  }

  public loadNewAudioProfile(audioProfile) {
    // The audio profile is updated with the new values
    for (const audioStatus in audioProfile) {
      // Parses the object, if the key is profileName, it means its not an audio.
      if (audioStatus !== 'profileName') {
        this.loadedProfile[audioStatus].audioFileName =
          audioProfile[audioStatus].fileName;
        this.loadedProfile[audioStatus].audioVolume =
          audioProfile[audioStatus].audioVolume;
        this.loadedProfile[audioStatus].isPlaying =
          audioProfile[audioStatus].isPlaying;
      } else {
        this.loadedProfile.profileName = audioProfile[audioStatus];
      }
    }
    this.profileTitle = this.loadedProfile.profileName;

    this.checkInitialProfilePlayState();
  }

  public playMusic(soundName) {
    if (!this.loadedProfile[soundName + 'Audio'].isPlaying) {
      this.loadedProfile[soundName + 'Audio'].audioHtmlElement.play();
      this.loadedProfile[soundName + 'Audio'].isPlaying = true;
    } else {
      this.loadedProfile[soundName + 'Audio'].audioHtmlElement.pause();
      this.loadedProfile[soundName + 'Audio'].isPlaying = false;
    }
  }

  /**
   * Checks for sounds initialized with "isPlaying" set to true, and calls .play() on the HTMLAudioElement.
   * This is necessary for when a profile is loaded externally.
   */
  public checkInitialProfilePlayState() {
    // If no nextProfile provided, check for true isPlaying audios to make them start.
    for (const audioStatus in this.loadedProfile) {
      if (this.loadedProfile[audioStatus].isPlaying === true) {
        this.loadedProfile[audioStatus].audioHtmlElement.play();
      } else if (this.loadedProfile[audioStatus].isPlaying === false) {
        this.loadedProfile[audioStatus].audioHtmlElement.pause();
      }
    }
  }

  public userStateSubscription() {
    // Subscription to User info changes. It will update the userLogged instance with every change.
    this.sessionService.userStateEmitter.subscribe(newUserState => {
      // Assigns the new user state.
      this.userLogged = newUserState;

      // If new state isn't null
      if (newUserState) {
        // Subscribes to the user's audio profiles observable
        this.userAudioProfilesSubscription();
      } else {
        // Unsubscribes from the observable if the new user state is null
        this.userAudioProfilesSubs.unsubscribe();
        this.router.navigate(['landing']);
      }
    });
  }

  public userAudioProfilesSubscription() {
    this.userAudioProfilesSubs = this.getUserAudioProfiles().subscribe(res => {
      // Updates the whole list of profiles
      if (!this.loadedProfilesList) {
        this.loadedProfilesList = res;
      }

      // Looks for the loaded profile inside the new array of profiles, to load its properties.
      const profileToUpdate = res.find(profile => {
        return profile.profileName === this.loadedProfile.profileName;
      });

      if (profileToUpdate) {
        // The audio profile is updated with the new values
        for (const audioStatus in profileToUpdate) {
          // Parses the object, if the key is profileName, it means its not an audio.
          if (audioStatus !== 'profileName') {
            this.loadedProfile[audioStatus].audioFileName =
              profileToUpdate[audioStatus].fileName;
            this.loadedProfile[audioStatus].audioVolume =
              profileToUpdate[audioStatus].audioVolume;
            this.loadedProfile[audioStatus].isPlaying =
              profileToUpdate[audioStatus].isPlaying;
          } else {
            this.loadedProfile.profileName = profileToUpdate[audioStatus];
          }
        }
      }

      // Parse the AudioProfile to check for isPlaying audios.
      this.checkInitialProfilePlayState();
    });
  }

  // MAGIC: DO NOT TOUCH
  updateFirebase() {
    const index = this.loadedProfilesList
      .map(profile => profile.profileName)
      .indexOf(this.loadedProfile.profileName);

    // this.fbService
    //   .object(`/${this.userLogged.username}/profiles/${index.toString()}`)
    //   .valueChanges()
    //   .subscribe(obj => {
    //     if (!obj) {
    //       // object does not exist
    //     } else {
    //       // object exists.
    //       console.log('existe');
    this.fbService
      .list(`/${this.userLogged.username}/profiles`)
      .set(index.toString(), {
        profileName: this.profileTitle,
        rainAudio: {
          fileName: this.loadedProfile.rainAudio.audioFileName,
          audioVolume: this.loadedProfile.rainAudio.audioVolume,
          isPlaying: this.loadedProfile.rainAudio.isPlaying
        },
        windAudio: {
          fileName: this.loadedProfile.windAudio.audioFileName,
          audioVolume: this.loadedProfile.windAudio.audioVolume,
          isPlaying: this.loadedProfile.windAudio.isPlaying
        },
        fireAudio: {
          fileName: this.loadedProfile.fireAudio.audioFileName,
          audioVolume: this.loadedProfile.fireAudio.audioVolume,
          isPlaying: this.loadedProfile.fireAudio.isPlaying
        },
        gardenAudio: {
          fileName: this.loadedProfile.gardenAudio.audioFileName,
          audioVolume: this.loadedProfile.gardenAudio.audioVolume,
          isPlaying: this.loadedProfile.gardenAudio.isPlaying
        },
        riverAudio: {
          fileName: this.loadedProfile.riverAudio.audioFileName,
          audioVolume: this.loadedProfile.riverAudio.audioVolume,
          isPlaying: this.loadedProfile.riverAudio.isPlaying
        },
        seaAudio: {
          fileName: this.loadedProfile.seaAudio.audioFileName,
          audioVolume: this.loadedProfile.seaAudio.audioVolume,
          isPlaying: this.loadedProfile.seaAudio.isPlaying
        },
        stormAudio: {
          fileName: this.loadedProfile.stormAudio.audioFileName,
          audioVolume: this.loadedProfile.stormAudio.audioVolume,
          isPlaying: this.loadedProfile.stormAudio.isPlaying
        },
        nightAudio: {
          fileName: this.loadedProfile.nightAudio.audioFileName,
          audioVolume: this.loadedProfile.nightAudio.audioVolume,
          isPlaying: this.loadedProfile.nightAudio.isPlaying
        }
      });

    // Update name of profile if changed
    this.loadedProfilesList.find(
      profile => profile.profileName === this.loadedProfile.profileName
    ).profileName = this.profileTitle;

    // Looks for the loaded profile inside the new array of profiles, to load its properties.
    const profileToUpdate = this.loadedProfilesList.find(profile => {
      return profile.profileName === this.loadedProfile.profileName;
    });

    if (profileToUpdate) {
      // The audio profile is updated with the new values
      for (const audioStatus in profileToUpdate) {
        // Parses the object, if the key is profileName, it means its not an audio.
        if (audioStatus !== 'profileName') {
          profileToUpdate[audioStatus].fileName = this.loadedProfile[
            audioStatus
          ].audioFileName;
          profileToUpdate[audioStatus].audioVolume = this.loadedProfile[
            audioStatus
          ].audioVolume;
          profileToUpdate[audioStatus].isPlaying = this.loadedProfile[
            audioStatus
          ].isPlaying;
        } else {
          profileToUpdate.profileName = this.loadedProfile[audioStatus];
        }
      }
    }
  }
}
