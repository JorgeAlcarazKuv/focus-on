export class AudioStatus {
  private _audioVolume: number;
  private _audioFileName: string;
  private _isPlaying: boolean;
  public audioHtmlElement: HTMLAudioElement;

  constructor(
    params: {
      audioVolume?: number;
      isPlaying?: boolean;
      fileName?: string;
    } = {}
  ) {
    this.audioHtmlElement = new Audio();
    this.audioHtmlElement.loop = true;
    this.audioVolume = params.audioVolume || 0.5;
    this.audioFileName = params.fileName || 'default';
    this._isPlaying = params.isPlaying || false;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }
  set isPlaying(isPlaying) {
    this._isPlaying = isPlaying;
  }

  set audioVolume(volume) {
    this._audioVolume = volume;
    this.audioHtmlElement.volume = volume;
  }
  get audioVolume() {
    return this._audioVolume;
  }
  set audioFileName(filename) {
    this._audioFileName = filename;
    this.audioHtmlElement.src = `/assets/audio/${filename}`;
    // this.audioHtmlElement.src = `https://raw.githubusercontent.com/JorgeAlcarazKuv/focus-on/gh-pages/assets/audio/${filename}`;
  }
  get audioFileName() {
    return this._audioFileName;
  }
}
