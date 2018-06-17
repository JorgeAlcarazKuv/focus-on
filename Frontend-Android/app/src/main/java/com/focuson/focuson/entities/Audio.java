package com.focuson.focuson.entities;

public class Audio {

    private String fileName;
    private boolean isPlaying;
    private double audioVolume;

    Audio() {

    }

    public Audio(String fileName, boolean isPlaying, double audioVolume) {
        this.fileName = fileName;
        this.isPlaying = isPlaying;
        this.audioVolume = audioVolume;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public boolean getIsPlaying() {
        return isPlaying;
    }

    public void setIsPlaying(boolean playing) {
        isPlaying = playing;
    }

    public double getAudioVolume() {
        return audioVolume;
    }

    public void setAudioVolume(double audioVolume) {
        this.audioVolume = audioVolume;
    }
}
