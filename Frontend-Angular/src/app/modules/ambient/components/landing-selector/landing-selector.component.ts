import { Component, OnInit } from '@angular/core';
import { SoundPlayerService } from '../../../../shared/services/sound-player.service';

@Component({
  selector: 'app-landing-selector',
  templateUrl: './landing-selector.component.html',
  styleUrls: ['./landing-selector.component.css']
})
export class LandingSelectorComponent implements OnInit {
  constructor(private soundPlayerService: SoundPlayerService) {}

  ngOnInit() {}

  loadProfile(profile) {
    switch (profile) {
      case 'productivity':
        this.soundPlayerService.loadNewAudioProfile({
          profileName: 'Productivity',
          gardenAudio: {
            fileName: 'garden.mp3',
            isPlaying: true,
            audioVolume: 0.4
          },
          nightAudio: {
            fileName: 'night.mp3',
            isPlaying: true,
            audioVolume: 0.7
          },
          fireAudio: {
            fileName: 'fire.mp3',
            isPlaying: true,
            audioVolume: 0.3
          }
        });
        break;
      case 'relax':
        this.soundPlayerService.loadNewAudioProfile({
          profileName: 'Relax',
          stormAudio: {
            fileName: 'storm.mp3',
            isPlaying: true,
            audioVolume: 0.8
          },
          riverAudio: {
            fileName: 'river.mp3',
            isPlaying: true,
            audioVolume: 0.4
          },
          windAudio: {
            fileName: 'wind.mp3',
            isPlaying: false,
            audioVolume: 0.5
          },
        });
        break;
      case 'random':
        this.soundPlayerService.loadNewAudioProfile({
          profileName: 'Random!',
          stormAudio: {
            fileName: 'storm.mp3',
            isPlaying: true,
            audioVolume: 0.3
          },
          gardenAudio: {
            fileName: 'garden.mp3',
            isPlaying: true,
            audioVolume: 0.8
          },
          fireAudio: {
            fileName: 'fire.mp3',
            isPlaying: true,
            audioVolume: 0.5
          }
        });
        break;
    }
  }
}
