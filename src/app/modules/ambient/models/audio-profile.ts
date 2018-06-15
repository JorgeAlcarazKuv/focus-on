import { AudioStatus } from './audio-status';

export class AudioProfile {
  public profileName: string;
  public rainAudio: AudioStatus;
  public stormAudio: AudioStatus;
  public fireAudio: AudioStatus;
  public riverAudio: AudioStatus;
  public seaAudio: AudioStatus;
  public nightAudio: AudioStatus;
  public windAudio: AudioStatus;
  public gardenAudio: AudioStatus;
  public extraAudioList: AudioStatus[];

  constructor(
    params: {
      profileName?: string;
      rainAudio?: AudioStatus;
      stormAudio?: AudioStatus;
      fireAudio?: AudioStatus;
      riverAudio?: AudioStatus;
      seaAudio?: AudioStatus;
      nightAudio?: AudioStatus;
      windAudio?: AudioStatus;
      gardenAudio?: AudioStatus;
    } = {}
  ) {
    this.profileName = params.profileName || 'Default';
    this.rainAudio =
      params.rainAudio ? new AudioStatus(params.rainAudio) : new AudioStatus({ fileName: 'rain.mp3' });
    this.stormAudio =
      params.stormAudio ? new AudioStatus(params.stormAudio) : new AudioStatus({ fileName: 'storm.mp3' });
    this.fireAudio =
      params.fireAudio ? new AudioStatus(params.fireAudio) : new AudioStatus({ fileName: 'fire.mp3' });
    this.riverAudio =
      params.riverAudio ? new AudioStatus(params.riverAudio) : new AudioStatus({ fileName: 'river.mp3' });
    this.seaAudio =
      params.seaAudio ? new AudioStatus(params.seaAudio) : new AudioStatus({ fileName: 'sea.mp3' });
    this.nightAudio =
      params.nightAudio ? new AudioStatus(params.nightAudio) : new AudioStatus({ fileName: 'night.mp3' });
    this.windAudio =
      params.windAudio ? new AudioStatus(params.windAudio) : new AudioStatus({ fileName: 'wind.mp3' });
    this.gardenAudio =
      params.gardenAudio ? new AudioStatus(params.gardenAudio) : new AudioStatus({ fileName: 'garden.mp3' });
  }
}
