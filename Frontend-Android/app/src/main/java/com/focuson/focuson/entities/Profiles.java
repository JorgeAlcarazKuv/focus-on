package com.focuson.focuson.entities;

import java.util.List;

public class Profiles {
    private String profileName;
    //Based on front-end's object structure
    private Audio rainAudio;
    private Audio stormAudio;
    private Audio windAudio;
    private Audio seaAudio;
    private Audio gardenAudio;
    private Audio nightAudio;
    private Audio riverAudio;
    private Audio fireAudio;

   public Profiles() {

    }

    public Profiles(String profileName, Audio rainAudio, Audio stormAudio, Audio windAudio, Audio seaAudio, Audio gardenAudio, Audio nightAudio, Audio riverAudio, Audio fireAudio) {
        this.profileName = profileName;
        this.rainAudio = rainAudio;
        this.stormAudio = stormAudio;
        this.windAudio = windAudio;
        this.seaAudio = seaAudio;
        this.gardenAudio = gardenAudio;
        this.nightAudio = nightAudio;
        this.riverAudio = riverAudio;
        this.fireAudio = fireAudio;
    }

  public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public Audio getRainAudio() {
        return rainAudio;
    }

    public void setRainAudio(Audio rainAudio) {
        this.rainAudio = rainAudio;
    }

    public Audio getStormAudio() {
        return stormAudio;
    }

    public void setStormAudio(Audio stormAudio) {
        this.stormAudio = stormAudio;
    }

    public Audio getWindAudio() {
        return windAudio;
    }

    public void setWindAudio(Audio windAudio) {
        this.windAudio = windAudio;
    }

    public Audio getSeaAudio() {
        return seaAudio;
    }

    public void setSeaAudio(Audio seaAudio) {
        this.seaAudio = seaAudio;
    }

    public Audio getGardenAudio() {
        return gardenAudio;
    }

    public void setGardenAudio(Audio gardenAudio) {
        this.gardenAudio = gardenAudio;
    }

    public Audio getNightAudio() {
        return nightAudio;
    }

    public void setNightAudio(Audio nightAudio) {
        this.nightAudio = nightAudio;
    }

    public Audio getRiverAudio() {
        return riverAudio;
    }

    public void setRiverAudio(Audio riverAudio) {
        this.riverAudio = riverAudio;
    }

    public Audio getFireAudio() {
        return fireAudio;
    }

    public void setFireAudio(Audio fireAudio) {
        this.fireAudio = fireAudio;
    }
}
